import { ResizeModule, SquooshResizeWasm, SquooshWasm } from '../../types';
import SquooshResize from './SquooshResize';

const squooshResizeModule = async (fileName: string, opts: SquooshWasm.ModuleOpts): Promise<ResizeModule> => {
  const file = opts.locateFile(fileName);
  const results = await WebAssembly.instantiateStreaming(fetch(file), {});

  if (results.instance && results.instance.exports) {
    const wasm = results.instance.exports as SquooshResizeWasm;
    const sr = new SquooshResize(wasm);
    if (opts.onRuntimeInitialized) opts.onRuntimeInitialized();
    const resize = sr.resize;
    return { ...wasm, id: 'squooshResizeModule', resize };
  }
  throw Error('Wasm file could not be loaded');
};

export default squooshResizeModule;
