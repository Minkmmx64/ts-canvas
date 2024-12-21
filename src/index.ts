import { CanvasSystem } from "./core/CanvasSystem";
import { CanvasTools } from "./core/CanvasTools";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const System = CanvasSystem.createCanvas(canvas, {
  aspect: 1,
  size: window.innerWidth - 50, // 画布最大宽度，根据Grid Size 调整
  canvasOptions: {
    background: "rgba(200,200,200,0.1)"
  }
});

// const tool = new CanvasTools();
// tool.drawText(
//   "文字内容",
//   {
//     size: 16,
//     direction: "horizontal",
//     color: "#ff0000"
//   },
//   80,
//   80
// )

