import { decodeImage } from '../../util/decodeImage';
import {
  DefaultResizeOptions,
  FitMethod,
  ImageResizeOpts,
  ResizeMethod,
  ResizeModule,
  WorkerResizeOptions,
} from '../../types';
import initModule from '../../util/initModule';
import squooshResizeModule from './squooshResizeModule';
import getContainOffsets from './getContainOffsets';
import imageCrop from './imageCrop';

const defaultOptions: DefaultResizeOptions = {
  method: ResizeMethod.Lanczos3,
  fitMethod: FitMethod.Stretch,
  premultiply: true,
  linearRGB: true,
};

const resizeMethods: WorkerResizeOptions['method'][] = [
  ResizeMethod.Triangle,
  ResizeMethod.Catrom,
  ResizeMethod.Mitchell,
  ResizeMethod.Lanczos3,
];

let resizeWasmModule: Promise<ResizeModule>;

const resize = async (wasmUrl: string, data: ImageData, opts: WorkerResizeOptions): Promise<ImageData> => {
  if (!resizeWasmModule) {
    resizeWasmModule = initModule((opts) => squooshResizeModule('squoosh_resize_bg.wasm', opts), wasmUrl);
  }
  const module = await resizeWasmModule;

  let input = data;

  if (opts.fitMethod === 'contain') {
    const { sx, sy, sw, sh } = getContainOffsets(data.width, data.height, opts.width, opts.height);
    input = imageCrop(input, Math.round(sx), Math.round(sy), Math.round(sw), Math.round(sh));
  }

  const result = module.resize(
    new Uint8Array(input.data.buffer),
    input.width,
    input.height,
    opts.width,
    opts.height,
    resizeMethods.indexOf(opts.method),
    opts.premultiply,
    opts.linearRGB,
  );

  return new ImageData(new Uint8ClampedArray(result.buffer), opts.width, opts.height);
};

const imageResize = async (wasmUrl: string, file: File, opts: ImageResizeOpts): Promise<ImageData> => {
  const decoded: ImageData = await decodeImage(file);
  const options: WorkerResizeOptions = { ...defaultOptions, ...opts };
  return resize(wasmUrl, decoded, options);
};

export default imageResize;
