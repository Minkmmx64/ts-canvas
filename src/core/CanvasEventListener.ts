import { coordinate } from "../math/algebra";
import { MousePoint2D, Point2D } from "../type/common.type";
import { CanvasSystem } from "./CanvasSystem";

export class CanvasEventListener {
  private boundary !: Point2D;
  private begin!: MousePoint2D;
  private move!: MousePoint2D;
  private preMove !: MousePoint2D;
  private end!: MousePoint2D;
  private canvasSystem !: CanvasSystem;

  public canvas!: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, boundary: Point2D, canvasSystem: CanvasSystem) {
    if (!canvas) throw new TypeError("canvas is not exist");
    this.canvas = canvas;
    this.boundary = boundary;
    this.canvasSystem = canvasSystem;
    this.initEvenListener();
  }

  private toCanvasScreenPoint(point: Point2D): Point2D {
    return coordinate.div(point, this.boundary);
  }

  public initEvenListener() {
    const eventMouseDown = this.eventMouseDown.bind(this);
    const eventMouseUp = this.eventMouseUp.bind(this);
    const eventMouseMove = this.eventMouseMove.bind(this);
    const eventWheel = this.eventWheel.bind(this);
    this.canvas.addEventListener("mousedown", e => {
      eventMouseDown(e);
      this.canvas.addEventListener("mousemove", eventMouseMove);
    });
    this.canvas.addEventListener("mouseup", e => {
      eventMouseUp(e);
      this.canvas.removeEventListener("mousemove", eventMouseMove);
    });
    this.canvas.addEventListener("wheel", eventWheel);
    this.canvas.addEventListener("contextmenu", e => {
      e.preventDefault();
    })
  }

  private eventMouseDown(e: MouseEvent) {
    this.begin = this.toCanvasScreenPoint({ x: e.clientX, y: e.clientY });
    this.preMove = this.toCanvasScreenPoint({ x: e.clientX, y: e.clientY });
    console.log("mousedown", this.begin);
  }

  private eventMouseMove(e: MouseEvent) {
    this.move = this.toCanvasScreenPoint({ x: e.clientX, y: e.clientY });
    const translation = coordinate.div(this.move, this.preMove);
    this.canvasSystem.canvasTransform.addTranslation(translation);
    this.preMove = this.toCanvasScreenPoint({ x: e.clientX, y: e.clientY });
    console.log("mousemove", this.move);
  }

  private eventMouseUp(e: MouseEvent) {
    this.end = this.toCanvasScreenPoint({ x: e.clientX, y: e.clientY });
    console.log("mouseup", this.end);
  }

  private eventWheel(e: WheelEvent) {
    console.log("wheel", e);
    if (e.deltaY > 0) {
      this.canvasSystem.canvasTransform.addScale(-this.canvasSystem.const.TRANSFORM_SCALE_STEP);
    } else if (e.deltaY < 0) {
      this.canvasSystem.canvasTransform.addScale(+this.canvasSystem.const.TRANSFORM_SCALE_STEP);
    }
  }
}