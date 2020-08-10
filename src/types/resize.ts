import { SquooshWasm } from './wasm';

export enum ResizeMethod {
  Triangle = 'triangle',
  Catrom = 'catrom',
  Mitchell = 'mitchell',
  Lanczos3 = 'lanczos3',
}

export enum FitMethod {
  Stretch = 'stretch',
  Contain = 'contain',
}

export interface ImageResizeOpts {
  width: number;
  height: number;
  method?: ResizeMethod;
  fitMethod?: FitMethod;
  premultiply?: boolean;
  linearRGB?: boolean;
}

export type WorkerResizeOptions = Required<ImageResizeOpts>;
export type DefaultResizeOptions = Omit<WorkerResizeOptions, 'width' | 'height'>;

export interface ResizeModule extends SquooshWasm.Module {
  resize: (
    inputImage: Uint8Array,
    inputWidth: number,
    inputHeight: number,
    outputWidth: number,
    outputHeight: number,
    typIdx: number,
    premultiply: boolean,
    colorSpaceConversion: boolean,
  ) => Uint8Array;
}

export interface SquooshResizeWasm extends WebAssembly.Exports {
  memory: WebAssembly.Memory;
  resize: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
    g: number,
    h: number,
    i: boolean,
    j: boolean,
  ) => void;
  __wbindgen_malloc: (a: number) => number;
  __wbindgen_free: (a: number, b: number) => void;
}
