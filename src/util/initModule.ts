import { SquooshWasm } from '../types';

type ModuleFactory<M extends SquooshWasm.Module> = (opts: SquooshWasm.ModuleOpts) => Promise<M>;

export const initModule = <T extends SquooshWasm.Module>(
  moduleFactory: ModuleFactory<T>,
  wasmUrl: string,
): Promise<T> => {
  return new Promise((resolve) => {
    const module = moduleFactory({
      // Just to be safe, don't automatically invoke any wasm functions
      noInitialRun: true,
      locateFile(url: string): string {
        // Redirect the request for the wasm binary to whatever webpack gave us.
        if (url.endsWith('.wasm')) return wasmUrl;
        return url;
      },
      onRuntimeInitialized() {
        // An Emscripten is a then-able that resolves with itself, causing an infite loop when you
        // wrap it in a real promise. Delete the `then` prop solves this for now.
        // https://github.com/kripken/emscripten/issues/5820
        delete (module as Promise<never>).then;
        resolve(module);
      },
    });
  });
};

export default initModule;
