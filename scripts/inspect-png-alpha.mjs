import fs from "node:fs";
import zlib from "node:zlib";

const png = fs.readFileSync(process.argv[2]);
let offset = 8;
let width;
let height;
let colorType;
const idat = [];
while (offset < png.length) {
  const length = png.readUInt32BE(offset);
  const type = png.toString("ascii", offset + 4, offset + 8);
  const data = png.subarray(offset + 8, offset + 8 + length);
  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    colorType = data[9];
  } else if (type === "IDAT") idat.push(data);
  offset += length + 12;
}
if (colorType !== 6) throw new Error(`Expected RGBA PNG; color type is ${colorType}`);
const raw = zlib.inflateSync(Buffer.concat(idat));
const stride = width * 4;
const rows = [];
let sourceOffset = 0;
for (let y = 0; y < height; y += 1) {
  const filter = raw[sourceOffset++];
  const row = Buffer.from(raw.subarray(sourceOffset, sourceOffset + stride));
  sourceOffset += stride;
  const previous = rows[y - 1];
  for (let x = 0; x < stride; x += 1) {
    const left = x >= 4 ? row[x - 4] : 0;
    const up = previous ? previous[x] : 0;
    const upperLeft = previous && x >= 4 ? previous[x - 4] : 0;
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
let transparent = 0;
let translucent = 0;
let opaque = 0;
for (const row of rows) {
  for (let x = 3; x < row.length; x += 4) {
    if (row[x] === 0) transparent += 1;
    else if (row[x] === 255) opaque += 1;
    else translucent += 1;
  }
}
console.log({ width, height, transparent, translucent, opaque, cornerAlpha: rows[0][3], centerTopAlpha: rows[Math.floor(height * 0.2)][Math.floor(width / 2) * 4 + 3] });
