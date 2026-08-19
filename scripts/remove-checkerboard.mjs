import fs from "node:fs";
import zlib from "node:zlib";

const [input, output] = process.argv.slice(2);
const png = fs.readFileSync(input);
let offset = 8;
let width;
let height;
const idat = [];
while (offset < png.length) {
  const length = png.readUInt32BE(offset);
  const type = png.toString("ascii", offset + 4, offset + 8);
  const data = png.subarray(offset + 8, offset + 8 + length);
  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    if (data[8] !== 8 || data[9] !== 2) throw new Error("Expected an 8-bit RGB PNG");
  } else if (type === "IDAT") idat.push(data);
  offset += length + 12;
}

const bytesPerPixel = 3;
const stride = width * bytesPerPixel;
const raw = zlib.inflateSync(Buffer.concat(idat));
const rows = [];
let sourceOffset = 0;
for (let y = 0; y < height; y += 1) {
  const filter = raw[sourceOffset++];
  const row = Buffer.from(raw.subarray(sourceOffset, sourceOffset + stride));
  sourceOffset += stride;
  const previous = rows[y - 1];
  for (let x = 0; x < stride; x += 1) {
    const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
    const up = previous ? previous[x] : 0;
    const upperLeft = previous && x >= bytesPerPixel ? previous[x - bytesPerPixel] : 0;
    if (filter === 1) row[x] = (row[x] + left) & 255;
    else if (filter === 2) row[x] = (row[x] + up) & 255;
    else if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255;
    else if (filter === 4) {
      const p = left + up - upperLeft;
      const pa = Math.abs(p - left);
      const pb = Math.abs(p - up);
      const pc = Math.abs(p - upperLeft);
      row[x] = (row[x] + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upperLeft)) & 255;
    }
  }
  rows.push(row);
}

const removable = (x, y) => {
  const index = x * 3;
  const r = rows[y][index];
  const g = rows[y][index + 1];
  const b = rows[y][index + 2];
  return Math.min(r, g, b) >= 216 && Math.max(r, g, b) - Math.min(r, g, b) <= 22;
};
const mask = new Uint8Array(width * height);
const queue = [];
const add = (x, y) => {
  const index = y * width + x;
  if (x < 0 || y < 0 || x >= width || y >= height || mask[index] || !removable(x, y)) return;
  mask[index] = 1;
  queue.push(index);
};
for (let x = 0; x < width; x += 1) {
  add(x, 0);
  add(x, height - 1);
}
for (let y = 0; y < height; y += 1) {
  add(0, y);
  add(width - 1, y);
}
// Seed the enclosed clear-windscreen region separately from the exterior.
for (let y = Math.floor(height * 0.04); y < Math.floor(height * 0.28); y += 12) {
  for (let x = Math.floor(width * 0.35); x < Math.floor(width * 0.65); x += 12) add(x, y);
}
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const index = queue[cursor];
  const x = index % width;
  const y = Math.floor(index / width);
  if (x > 0) add(x - 1, y);
  if (x + 1 < width) add(x + 1, y);
  if (y > 0) add(x, y - 1);
  if (y + 1 < height) add(x, y + 1);
}

const encoded = Buffer.alloc((width * 4 + 1) * height);
for (let y = 0; y < height; y += 1) {
  const rowStart = y * (width * 4 + 1);
  encoded[rowStart] = 0;
  for (let x = 0; x < width; x += 1) {
    const sourceIndex = x * 3;
    const targetIndex = rowStart + 1 + x * 4;
    encoded[targetIndex] = rows[y][sourceIndex];
    encoded[targetIndex + 1] = rows[y][sourceIndex + 1];
    encoded[targetIndex + 2] = rows[y][sourceIndex + 2];
    encoded[targetIndex + 3] = mask[y * width + x] ? 0 : 255;
  }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const chunk = (type, data) => {
  const name = Buffer.from(type);
  let crc = 0xffffffff;
  for (const byte of Buffer.concat([name, data])) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  const result = Buffer.alloc(data.length + 12);
  result.writeUInt32BE(data.length, 0);
  name.copy(result, 4);
  data.copy(result, 8);
  result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, data.length + 8);
  return result;
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const result = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(encoded, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);
fs.writeFileSync(output, result);
