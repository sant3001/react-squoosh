import mozjpegEnc, { MozJPEGModule, OptimizeOptions } from './mozjpeg_enc';
import { MozJpegColorSpace } from './MozJpegColorSpace';
import initModule from '../../util/initModule';

/* eslint-disable @typescript-eslint/camelcase */

const defaultOptions: OptimizeOptions = {
  quality: 75,
  baseline: false,
  arithmetic: false,
  progressive: true,
  optimize_coding: true,
  smoothing: 0,
  color_space: MozJpegColorSpace.YCbCr,
  quant_table: 3,
  trellis_multipass: false,
  trellis_opt_zero: false,
  trellis_opt_table: false,
  trellis_loops: 1,
  auto_subsample: true,
  chroma_subsample: 2,
  separate_chroma_quality: false,
  chroma_quality: 75,
};

let optimizeWasmModule: Promise<MozJPEGModule>;

export const imageOptimize = async (
  wasmUrl: string,
  data: ImageData,
  options?: Partial<OptimizeOptions>,
): Promise<ArrayBuffer> => {
  if (!optimizeWasmModule) optimizeWasmModule = initModule(mozjpegEnc, wasmUrl);
  const module = await optimizeWasmModule;
  const mergedOptions = { ...defaultOptions, ...(options || {}) };
  const resultView = module.encode(data.data, data.width, data.height, mergedOptions);
  // wasm can’t run on SharedArrayBuffers, so we hard-cast to ArrayBuffer.
  return resultView.buffer as ArrayBuffer;
};
