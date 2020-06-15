
export type GridArea = {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number,
}

export type Grid = {
  gridAreas: GridArea[],
  widths: string[],
  heights: string[],
  gap: number
}