import { AspectRatio, ICanvasOptions, ICanvasSystemOptions, SizeIntoAspectRatio } from "../type/canvas.type";
import { CanvasEventListener } from "./CanvasEventListener";
import { CanvasTransform } from "./CanvasTransform";
import { CavnasCoordinate } from "./CavnasCoordinate";

export class CanvasSystem {

  private node !: HTMLCanvasElement;
  private context !: CanvasRenderingContext2D;
  private canvasOptions !: ICanvasOptions;

  public canvasEventListener !: CanvasEventListener;
  public canvasTransform !: CanvasTransform;
  public cavnasCoordinate !: CavnasCoordinate;
  public const = {
    TRANSFORM_SCALE_STEP: 0.1,
    TRANSFORM_SCALE_MAX: 5,
    TRANSFORM_SCALE_MIN: 0.1,
    GRID: {
      SIZE: 100,
    }
  }

  private constructor(canvas: HTMLCanvasElement, options: ICanvasSystemOptions<AspectRatio>) {
    if (!canvas) throw new TypeError("canvas is not exist");
    const context = canvas.getContext("2d");
    if (!context) throw new TypeError("can not found CanvasRenderingContext2D");
    if (options.aspect === "auto") {
      const size = options.size as SizeIntoAspectRatio<"auto">;
      canvas.width = size.width;
      canvas.height = size.height;
    } else {
      const size = options.size as SizeIntoAspectRatio<number>;
      canvas.width = size;
      canvas.height = size / options.aspect;
    }
    this.node = canvas;
    this.context = context;
    this.canvasOptions = options.canvasOptions;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.style.background = this.canvasOptions.background ?? "#ffffff";
    const { left, top } = canvas.getBoundingClientRect();
    this.canvasEventListener = new CanvasEventListener(this.node, { x: left, y: top }, this);
    this.canvasTransform = new CanvasTransform(this);
    this.cavnasCoordinate = new CavnasCoordinate();
    this.render();
  }

  static createCanvas(canvas: HTMLCanvasElement, options: ICanvasSystemOptions<number>): void;
  static createCanvas(canvas: HTMLCanvasElement, options: ICanvasSystemOptions<"auto">): void;
  static createCanvas(canvas: HTMLCanvasElement, options: ICanvasSystemOptions<AspectRatio>) {
    return new CanvasSystem(canvas, options);
  }

  public render() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.node.width, this.node.height);
    ctx.save();
    ctx.translate(this.canvasTransform.transform.translation.x, this.canvasTransform.transform.translation.y);
    ctx.scale(this.canvasTransform.transform.scale, this.canvasTransform.transform.scale);
    this.drawRule();
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(100, 100, 100, 100);
    ctx.restore();
  }

  private drawRule() {
    const begin = { x: 0, y: 0 };
    const end = { x: this.node.width, y: this.node.height };
    const step = this.const.GRID.SIZE * this.canvasTransform.transform.scale;
    const ctx = this.context;
    const transform = this.canvasTransform.transform;
    const diffx = transform.translation.x - Math.floor(transform.translation.x / step) * step;
    const diffy = transform.translation.y - Math.floor(transform.translation.y / step) * step;
    /**
     * 原来绘制区域(0,0) => (w,h)
     * 平移后只需要对 每一列，每一行间隔 step 取模 = {x: diffx, y: diffy}
     * 绘制时只需要绘制相对于(0,0) => (w,h) 平移
     * moveTo,lineTo 时只需要把绘制的点求逆与ctx transform 抵消就可以实现无限滚动
     */
    for (let i = begin.x; i <= end.x; i += step) {
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      const lineBegin = this.canvasTransform.getReTransformPoint({ x: i + diffx, y: begin.y });
      const lineEnd = this.canvasTransform.getReTransformPoint({ x: i + diffx, y: end.y });
      ctx.moveTo(lineBegin.x, lineBegin.y);
      ctx.lineTo(lineEnd.x, lineEnd.y);
      ctx.stroke();
      ctx.closePath();
    }
    for (let i = begin.y; i <= end.y; i += step) {
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      const lineBegin = this.canvasTransform.getReTransformPoint({ x: begin.x, y: i + diffy });
      const lineEnd = this.canvasTransform.getReTransformPoint({ x: end.x, y: i + diffy });
      ctx.moveTo(lineBegin.x, lineBegin.y);
      ctx.lineTo(lineEnd.x, lineEnd.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

}