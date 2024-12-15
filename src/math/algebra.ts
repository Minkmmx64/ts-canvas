import { Point2D } from "../type/common.type";

export const coordinate = {
  div: (a: Point2D, b: Point2D): Point2D => ({ x: a.x - b.x, y: a.y - b.y }),
  add: (a: Point2D, b: Point2D): Point2D => ({ x: a.x + b.x, y: a.y + b.y })
}