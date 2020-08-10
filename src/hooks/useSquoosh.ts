import { useState } from 'react';
import imageResize from '../lib/resize/imageResize';
import { ImageResizeOpts } from '../types';
import { decodeImage } from '../util/decodeImage';
import { imageOptimize } from '../lib/optimize/imageOptimize';
import { OptimizeOptions } from '../lib/optimize/mozjpeg_enc';

interface WasmFileUrls {
  resizeWasmUrl?: string;
  optimizeWasmUrl?: string;
}

interface SquooshOptions {
  wasmFileUrls?: WasmFileUrls;
  resizeOpts?: ImageResizeOpts;
  optimizeOpts?: OptimizeOptions;
}

interface UseSquoosh {
  (opts: SquooshOptions): {
    squooshFile: (file: File) => void;
    file?: File;
    loading: boolean;
    imgSrcPreview?: string;
  };
}

export const useSquoosh: UseSquoosh = (opts) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [imgSrcPreview, setImgSrcPreview] = useState<string | undefined>();
  const squooshFile = (file: File): void => {
    setLoading(true);
    (async (): Promise<void> => {
      let image: ImageData;
      // Resize
      if (opts.wasmFileUrls?.resizeWasmUrl && opts.resizeOpts?.width && opts.resizeOpts?.height) {
        image = await imageResize(opts.wasmFileUrls.resizeWasmUrl, file, opts.resizeOpts);
      } else {
        image = await decodeImage(file);
      }

      if (opts.wasmFileUrls?.optimizeWasmUrl) {
        const arrayBuffer = await imageOptimize(opts.wasmFileUrls.optimizeWasmUrl, image, opts.optimizeOpts || {});
        const arrayBufferView = new Uint8Array(arrayBuffer);
        const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        const fileName = file.name.replace(/\.(.*)$/, '.jpeg');
        const newFile = new File([blob], fileName, { lastModified: file.lastModified, type: 'image/jpeg' });
        // Create Preview URL
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        setFile(newFile);
        setImgSrcPreview(imageUrl);
      }
      setLoading(false);
    })();
  };
  return { file, loading, squooshFile, imgSrcPreview };
};

export default useSquoosh;
