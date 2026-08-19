import fs from "node:fs";
import path from "node:path";

const [input, outputDirectory] = process.argv.slice(2);
const source = fs.readFileSync(input);
const sampleRate = source.readUInt32LE(24);
const channels = source.readUInt16LE(22);
const bitsPerSample = source.readUInt16LE(34);
const blockAlign = channels * (bitsPerSample / 8);

let cursor = 12;
let dataOffset;
while (cursor + 8 <= source.length) {
  const id = source.toString("ascii", cursor, cursor + 4);
  const size = source.readUInt32LE(cursor + 4);
  if (id === "data") {
    dataOffset = cursor + 8;
    break;
  }
  cursor += 8 + size + (size % 2);
}
if (dataOffset == null || channels !== 1 || bitsPerSample !== 16) {
  throw new Error("Expected a mono 16-bit PCM WAV");
}

const layers = [
  { name: "hornet-low.wav", start: 130, duration: 4.5 },
  { name: "hornet-mid.wav", start: 94.5, duration: 4.5 },
  { name: "hornet-high.wav", start: 107, duration: 4.0 },
];
const fadeFrames = Math.round(sampleRate * 0.08);

fs.mkdirSync(outputDirectory, { recursive: true });
for (const layer of layers) {
  const startFrame = Math.round(layer.start * sampleRate);
  const frameCount = Math.round(layer.duration * sampleRate);
  const pcm = Buffer.alloc(frameCount * blockAlign);
  source.copy(pcm, 0, dataOffset + startFrame * blockAlign, dataOffset + (startFrame + frameCount) * blockAlign);

  // Blend the tail into the head so BufferSource.loop has no hard click at its boundary.
  for (let frame = 0; frame < fadeFrames; frame += 1) {
    const mix = frame / (fadeFrames - 1);
    const headOffset = frame * 2;
    const tailOffset = (frameCount - fadeFrames + frame) * 2;
    const head = pcm.readInt16LE(headOffset);
    const tail = pcm.readInt16LE(tailOffset);
    pcm.writeInt16LE(Math.round(tail * (1 - mix) + head * mix), headOffset);
  }

  const wav = Buffer.alloc(44 + pcm.length);
  wav.write("RIFF", 0);
  wav.writeUInt32LE(36 + pcm.length, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(pcm.length, 40);
  pcm.copy(wav, 44);
  fs.writeFileSync(path.join(outputDirectory, layer.name), wav);
}
