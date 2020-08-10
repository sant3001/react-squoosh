interface DrawableToImageDataOptions {
  width?: number;
  height?: number;
  sx?: number;
  sy?: number;
  sw?: number;
  sh?: number;
}

export const drawableToImageData = (
  drawable: ImageBitmap | HTMLImageElement,
  opts: DrawableToImageDataOptions = {},
): ImageData => {
  const {
    width = drawable.width,
    height = drawable.height,
    sx = 0,
    sy = 0,
    sw = drawable.width,
    sh = drawable.height,
  } = opts;

  // Make canvas same size as image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  // Draw image onto canvas
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');
  ctx.drawImage(drawable, sx, sy, sw, sh, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
};

export const utlToImageElement = async (url: string): Promise<HTMLImageElement> => {
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
  const loaded = new Promise((resolve, reject) => {
    img.onload = (): void => resolve();
    img.onerror = (): void => reject(Error('Image loading error'));
  });

  if (img.decode) {
    // Nice off-thread way supported in Safari/Chrome.
    // Safari throws on decode if the source is SVG.
    // https://bugs.webkit.org/show_bug.cgi?id=188347
    await img.decode().catch(() => null);
  }

  // Always await loaded, as we may have bailed due to the Safari bug above.
  await loaded;
  return img;
};

export const blobToImg = async (blob: Blob): Promise<HTMLImageElement> => {
  const url = URL.createObjectURL(blob);
  try {
    return await utlToImageElement(url);
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const builtinDecode = async (blob: Blob): Promise<ImageData> => {
  // Prefer createImageBitmap as it's the off-thread option for Firefox.
  const drawable = 'createImageBitmap' in window ? await createImageBitmap(blob) : await blobToImg(blob);
  return drawableToImageData(drawable);
};

export const decodeImage = async (blob: Blob): Promise<ImageData> => {
  try {
    return await builtinDecode(blob);
  } catch (e) {
    throw Error("Couldn't decode image");
  }
};
