import { coordinate } from "../math/algebra";
import { ITransform } from "../type/canvas.type";
import { Point2D } from "../type/common.type";
import { CanvasSystem } from "./CanvasSystem";

export class CanvasTransform {
  public transform !: ITransform;

  private canvasSystem !: CanvasSystem;

  constructor(canvasSystem: CanvasSystem) {
    this.canvasSystem = canvasSystem;
    this.transform = {
      translation: { x: 0, y: 0 },
      scale: 1
    }
  }

  public setTranslation(translation: Point2D) {
    this.transform.translation = translation;
    this.canvasSystem.render();
  }

  public addTranslation(diff: Point2D) {
    this.transform.translation = coordinate.add(this.transform.translation, diff);
    this.canvasSystem.render();
  }

  public setScale(scale: number) {
    this.transform.scale = scale;
    this.canvasSystem.render();
  }

  public addScale(diff: number) {
    this.transform.scale += diff;
    this.canvasSystem.render();
  }
}