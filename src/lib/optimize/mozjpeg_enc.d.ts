import { SquooshWasm } from '../../types';
import { MozJpegColorSpace } from './MozJpegColorSpace';

export interface OptimizeOptions {
  quality: number;
  baseline: boolean;
  arithmetic: boolean;
  progressive: boolean;
  optimize_coding: boolean;
  smoothing: number;
  color_space: MozJpegColorSpace;
  quant_table: number;
  trellis_multipass: boolean;
  trellis_opt_zero: boolean;
  trellis_opt_table: boolean;
  trellis_loops: number;
  auto_subsample: boolean;
  chroma_subsample: number;
  separate_chroma_quality: boolean;
  chroma_quality: number;
}

export interface MozJPEGModule extends SquooshWasm.Module {
  encode(data: BufferSource, width: number, height: number, options: OptimizeOptions): Uint8Array;
}

export default function (opts: SquooshWasm.ModuleOpts): Promise<MozJPEGModule>;
