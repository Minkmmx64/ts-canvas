import { coordinate } from "../math/algebra";
import { BaseSizeOption, ITransform } from "../type/canvas.type";
import { Point2D } from "../type/common.type";
import { CanvasSystem } from "./CanvasSystem";

export class CanvasTransform {
  public transform !: ITransform;

  private canvasSystem !: CanvasSystem;

  constructor(canvasSystem: CanvasSystem, private boundary: BaseSizeOption) {
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
    const translation = coordinate.add(this.transform.translation, diff);
    this.transform.translation = this.hasBoundary(translation);
    this.canvasSystem.render();
  }

  public setScale(scale: number) {
    this.transform.scale = scale;
    this.canvasSystem.render();
  }

  public addScale(diff: number) {
    this.transform.scale += diff;
    this.transform.scale = Math.max(
      this.canvasSystem.const.TRANSFORM_SCALE_MIN,
      Math.min(
        this.canvasSystem.const.TRANSFORM_SCALE_MAX, this.transform.scale
      ))
    this.canvasSystem.render();
  }

  public getReTransformPoint(point: Point2D): Point2D {
    return {
      x: (point.x - this.transform.translation.x) / this.transform.scale,
      y: (point.y - this.transform.translation.y) / this.transform.scale
    }
  }

  public getTransformPoint(point: Point2D): Point2D {
    return {
      x: (point.x + this.transform.translation.x) * this.transform.scale,
      y: (point.y + this.transform.translation.y) * this.transform.scale
    }
  }

  //判断当前位移是否超出了边界
  public hasBoundary(translation: Point2D): Point2D {
    if (translation.x > 0) translation.x = 0;
    if (translation.y > 0) translation.y = 0;
    const gridSize = this.canvasSystem.const.GRID.SIZE * this.transform.scale;
    let screenColumn = Math.floor(this.canvasSystem.node.width / gridSize);
    let screenRow = Math.floor(this.canvasSystem.node.height / gridSize);
    let diffScreenColumn = this.canvasSystem.node.width - screenColumn * gridSize;
    let diffScreenRow = this.canvasSystem.node.height - screenRow * gridSize;
    const mx = (screenColumn - this.boundary.width) * gridSize + diffScreenColumn;
    const my = (screenRow - this.boundary.height) * gridSize + diffScreenRow;
    if (translation.x < mx) translation.x = mx;
    if (translation.y < my) translation.y = my;
    return translation;
  }
}