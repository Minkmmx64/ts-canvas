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
    });
    const eventTouchStart = this.eventTouchStart.bind(this);
    const eventTouchMove = this.eventTouchMove.bind(this);
    const eventTouchEnd = this.eventTouchEnd.bind(this);
    this.canvas.addEventListener("touchstart", eventTouchStart);
    this.canvas.addEventListener("touchmove", eventTouchMove);
    this.canvas.addEventListener("touchend", eventTouchEnd);
  }

  private eventMouseDown(e: MouseEvent) {
    console.log("mousedown", this.begin);
    this.setMouseBegin(e.clientX, e.clientY);
  }

  private eventMouseMove(e: MouseEvent) {
    console.log("mousemove", this.move);
    this.setMouseMove(e.clientX, e.clientY);
  }

  private eventMouseUp(e: MouseEvent) {
    console.log("mouseup", this.end);
    this.setMouseEnd(e.clientX, e.clientY);
  }

  private eventWheel(e: WheelEvent) {
    console.log("wheel", e);
    if (e.deltaY > 0) {
      this.canvasSystem.canvasTransform.addScale(-this.canvasSystem.const.TRANSFORM_SCALE_STEP);
    } else if (e.deltaY < 0) {
      this.canvasSystem.canvasTransform.addScale(+this.canvasSystem.const.TRANSFORM_SCALE_STEP);
    }
  }

  private eventTouchStart(e: TouchEvent) {
    console.log("touchstart", e);
    e.preventDefault();
    const { clientX, clientY } = e.touches[0];
    this.setMouseBegin(clientX, clientY);
  }

  private eventTouchMove(e: TouchEvent) {
    console.log("touchmove", e);
    e.preventDefault();
    const { clientX, clientY } = e.touches[0];
    if (e.touches.length >= 2) {
      const points = [...e.touches].map(_ => this.toCanvasScreenPoint({ x: _.clientX, y: _.clientY }));
      console.log(points);
    }
    this.setMouseMove(clientX, clientY);
  }

  private eventTouchEnd(e: TouchEvent) {
    console.log("touchend", e);
    e.preventDefault();
    const { clientX, clientY } = e.changedTouches[0];
    this.setMouseEnd(clientX, clientY);
  }

  private setMouseBegin(x: number, y: number) {
    this.begin = this.toCanvasScreenPoint({ x, y });
    this.preMove = this.toCanvasScreenPoint({ x, y });
  }

  private setMouseMove(x: number, y: number) {
    this.move = this.toCanvasScreenPoint({ x, y });
    this.transform();
    this.preMove = this.toCanvasScreenPoint({ x, y });
  }

  private setMouseEnd(x: number, y: number) {
    this.end = this.toCanvasScreenPoint({ x, y });
  }

  private transform() {
    const translation = coordinate.div(this.move, this.preMove);
    this.canvasSystem.canvasTransform.addTranslation(translation);
  }

}