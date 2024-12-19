import { BaseSizeOption } from "../type/canvas.type";

export class CanvasTools {

  constructor() { }

  drawText(content: string, textOptions: ITextOptions, width: number, height: number) {
    const texts = this.loadTexts(content, textOptions.direction);
    const { canvas, ctx } = this.getCanvas({ width, height });
    let maxWidth = 0, maxHeight = 0;
    const linespace = 1;
    texts.forEach(text => {
      ctx.font = `bold ${textOptions.size}px serif`;
      ctx.fillStyle = textOptions.color;
      const metric = ctx.measureText(text);
      const textWidth = metric.width;
      const textHeight = metric.actualBoundingBoxDescent + metric.actualBoundingBoxAscent;
      maxWidth = Math.max(textWidth, maxWidth);
      maxHeight += textHeight;
    });
    maxHeight += linespace * (texts.length - 1);
    let beginX = (width - maxWidth) / 2, beginY = (height - maxHeight) / 2;
    texts.forEach(text => {
      ctx.font = `bold ${textOptions.size}px serif`;
      ctx.fillStyle = textOptions.color;
      beginY += textOptions.size;
      ctx.textBaseline = "middle";
      ctx.fillText(text, beginX, beginY, maxWidth);
    });
    canvas.style.backgroundColor = "transparent";
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const imageData = ctx.getImageData(0, 0, width, height);
          resolve({ url, imageData });
        }
        reject();
      });
    })
  }

  private loadTexts(content: string, direction: ITextDirection): string[] {
    let texts: string[] = [];
    switch (direction) {
      case TextDirectionEnum.HORIZONTAL:
        texts = [content];
        break;
      case TextDirectionEnum.VERTICAL:
        texts = content.split("");
        break;
    }
    return texts;
  }

  private getCanvas(size?: BaseSizeOption) {
    const canvas = document.createElement("canvas");
    if (size) {
      const { width, height } = size;
      canvas.width = width, canvas.height = height;
    }
    const ctx = canvas.getContext("2d")!;
    return { canvas, ctx }
  }
}

export type ITextDirection = "vertical" | "horizontal";

export enum TextDirectionEnum {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal"
}

export interface ITextOptions {
  direction: ITextDirection;
  size: number;
  color: string;
}