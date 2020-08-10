export const imageCrop = (data: ImageData, sx: number, sy: number, sw: number, sh: number): ImageData => {
  const inputPixels = new Uint32Array(data.data.buffer);

  // Copy within the same buffer for speed and memory efficiency.
  for (let y = 0; y < sh; y += 1) {
    const start = (y + sy) * data.width + sx;
    inputPixels.copyWithin(y * sw, start, start + sw);
  }

  return new ImageData(new Uint8ClampedArray(inputPixels.buffer.slice(0, sw * sh * 4)), sw, sh);
};

export default imageCrop;
