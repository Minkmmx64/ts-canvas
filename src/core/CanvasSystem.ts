import { AspectRatio, ICanvasOptions, ICanvasSystemOptions, SizeIntoAspectRatio } from "../type/canvas.type";
import { CanvasEventListener } from "./CanvasEventListener";
import { CanvasTransform } from "./CanvasTransform";

export class CanvasSystem {

  private node !: HTMLCanvasElement;
  private context !: CanvasRenderingContext2D;
  private canvasOptions !: ICanvasOptions;

  public canvasEventListener !: CanvasEventListener;
  public canvasTransform !: CanvasTransform;

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

  }

}