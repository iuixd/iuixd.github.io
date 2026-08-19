import fs from "node:fs";

const file = process.argv[2];
const buffer = fs.readFileSync(file);
if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
  throw new Error("Not a RIFF/WAVE file");
}

let offset = 12;
let format;
let dataOffset;
let dataSize;
while (offset + 8 <= buffer.length) {
  const id = buffer.toString("ascii", offset, offset + 4);
  const size = buffer.readUInt32LE(offset + 4);
  if (id === "fmt ") {
    format = {
      encoding: buffer.readUInt16LE(offset + 8),
      channels: buffer.readUInt16LE(offset + 10),
      sampleRate: buffer.readUInt32LE(offset + 12),
      byteRate: buffer.readUInt32LE(offset + 16),
      blockAlign: buffer.readUInt16LE(offset + 20),
      bitsPerSample: buffer.readUInt16LE(offset + 22),
    };
  } else if (id === "data") {
    dataOffset = offset + 8;
    dataSize = size;
  }
  offset += 8 + size + (size % 2);
}
if (!format || dataOffset == null) throw new Error("Missing WAV fmt/data chunk");

const readSample = format.encoding === 3 && format.bitsPerSample === 32
  ? (byteOffset) => buffer.readFloatLE(byteOffset)
  : format.encoding === 1 && format.bitsPerSample === 16
    ? (byteOffset) => buffer.readInt16LE(byteOffset) / 32768
    : null;
if (!readSample) throw new Error(`Unsupported WAV format: ${JSON.stringify(format)}`);

const frames = Math.floor(dataSize / format.blockAlign);
const duration = frames / format.sampleRate;
const binSeconds = 0.5;
const binFrames = Math.floor(format.sampleRate * binSeconds);
const bins = [];
for (let start = 0; start < frames; start += binFrames) {
  const end = Math.min(frames, start + binFrames);
  let energy = 0;
  let crossings = 0;
  let previous = 0;
  let peak = 0;
  for (let frame = start; frame < end; frame += 1) {
    let sample = 0;
    for (let channel = 0; channel < format.channels; channel += 1) {
      sample += readSample(dataOffset + frame * format.blockAlign + channel * (format.bitsPerSample / 8));
    }
    sample /= format.channels;
    energy += sample * sample;
    peak = Math.max(peak, Math.abs(sample));
    if ((sample >= 0) !== (previous >= 0)) crossings += 1;
    previous = sample;
  }
  const count = end - start;
  bins.push({ t: Number((start / format.sampleRate).toFixed(1)), rms: Number(Math.sqrt(energy / count).toFixed(4)), peak: Number(peak.toFixed(3)), zcr: Math.round(crossings / binSeconds) });
}

console.log(JSON.stringify({ ...format, frames, duration: Number(duration.toFixed(3)), dataOffset, dataSize }, null, 2));
console.log(bins.map((bin) => `${bin.t.toFixed(1)}s rms=${bin.rms.toFixed(4)} peak=${bin.peak.toFixed(3)} zcr=${bin.zcr}`).join("\n"));
