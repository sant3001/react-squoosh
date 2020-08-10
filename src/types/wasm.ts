export declare namespace SquooshWasm {
  interface ModuleOpts {
    noInitialRun?: boolean;
    locateFile: (url: string) => string;
    onRuntimeInitialized?: () => void;
  }
  interface Module {
    id: string;
  }
}
