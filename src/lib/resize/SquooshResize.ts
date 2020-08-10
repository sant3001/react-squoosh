import { ResizeModule, SquooshResizeWasm } from '../../types';

export default class SquooshResize {
  private wasm: SquooshResizeWasm;
  cachegetUint8Memory0: Uint8Array | null = null;
  cachegetInt32Memory0: Int32Array | null = null;
  WASM_VECTOR_LEN = 0;

  constructor(wasm: SquooshResizeWasm) {
    this.wasm = wasm;
  }

  getUint8Memory0 = (): Uint8Array => {
    if (!this.cachegetUint8Memory0 || this.cachegetUint8Memory0.buffer !== this.wasm.memory.buffer) {
      this.cachegetUint8Memory0 = new Uint8Array(this.wasm.memory.buffer);
    }
    return this.cachegetUint8Memory0;
  };

  passArray8ToWasm0 = (arg: ArrayLike<number>): number => {
    const ptr = this.wasm.__wbindgen_malloc(arg.length);
    this.getUint8Memory0().set(arg, ptr);
    this.WASM_VECTOR_LEN = arg.length;
    return ptr;
  };

  getInt32Memory0 = (): Int32Array => {
    if (!this.cachegetInt32Memory0 || this.cachegetInt32Memory0.buffer !== this.wasm.memory.buffer) {
      this.cachegetInt32Memory0 = new Int32Array(this.wasm.memory.buffer);
    }
    return this.cachegetInt32Memory0;
  };

  getArrayU8FromWasm0 = (ptr: number, len: number): Uint8Array => {
    return this.getUint8Memory0().subarray(ptr, ptr + len);
  };

  resize: ResizeModule['resize'] = (
    inputImage,
    inputWidth,
    inputHeight,
    outputWidth,
    outputHeight,
    typIdx,
    premultiply,
    colorSpaceConversion,
  ) => {
    const ptr0 = this.passArray8ToWasm0(inputImage);
    const len0 = this.WASM_VECTOR_LEN;
    this.wasm.resize(
      8,
      ptr0,
      len0,
      inputWidth,
      inputHeight,
      outputWidth,
      outputHeight,
      typIdx,
      premultiply,
      colorSpaceConversion,
    );
    const r0 = this.getInt32Memory0()[8 / 4];
    const r1 = this.getInt32Memory0()[8 / 4 + 1];
    const v1 = this.getArrayU8FromWasm0(r0, r1).slice();
    this.wasm.__wbindgen_free(r0, r1);
    return v1;
  };
}
