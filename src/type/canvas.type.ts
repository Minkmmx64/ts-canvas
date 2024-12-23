import { Point2D } from "./common.type";

export type AspectRatio = number | "auto";

export type SizeIntoAspectRatio<T extends AspectRatio> = T extends "auto" ? BaseSizeOption : T extends number ? number : never

export interface ICanvasSystemOptions<T extends AspectRatio> {
  aspect: T;
  size: SizeIntoAspectRatio<T>;
  canvasOptions: ICanvasOptions
}

export interface ICanvasOptions {
  background?: string;
}

export interface ITransform {
  translation: Point2D;
  scale: number;
}

export type BaseSizeOption = { width: number, height: number }