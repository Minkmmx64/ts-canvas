import { CanvasSystem } from "./core/CanvasSystem";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const System = CanvasSystem.createCanvas(canvas, {
  aspect: "auto",
  size: {
    width: window.innerWidth - 50,
    height: window.innerHeight - 50
  },
  canvasOptions: {
    background: "#007aff80"
  }
});

