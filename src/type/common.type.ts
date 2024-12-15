export interface Point2D {
  x: number;
  y: number;
}

export type MousePoint2D = Point2D;

export type pickOne<T, K extends keyof T> = T[K];