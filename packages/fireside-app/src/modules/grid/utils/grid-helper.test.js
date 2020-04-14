import * as helper from './grid-helper'

const createGridAreas = grid => {
  let areas = {}

  for(let y=0; y<grid.length; y++){
    for(let x=0; x<grid[y].length; x++){
      const id = grid[y][x]
      let area = areas[id]
      if(!area) area = { id, y, x, w:1, h:1 }
      area.h = y - area.y + 1
      if(area.w < (x - area.x + 1)) area.w = x - area.x + 1
      areas[id] = area
    }
  }

  return Object.values(areas).filter(area => area.id !== '-')
}

const createGrid = areas => {
  const width = areas.reduce((max, area) => {
    const w = area.x+area.w
    if(w > max) return w
    else return max
  }, 0)
  const height = areas.reduce((max, area) => {
    const h = area.y+area.h
    if(h > max) return h
    else return max
  }, 0)
  let grid = Array(height).fill().map(() => Array(width).fill('-'))

  for(let area of areas) {
    for(let y=area.y; y < area.y+area.h; y++) {
      for(let x=area.x; x < area.x+area.w; x++){
        grid[y][x] = area.id
      }
    }
  }

  return grid
}

describe('grid-helper', () => {
  test('createGridAreas works', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', '-'],
      ['a', 'a', 'c', 'd'],
    ])
    expect(areas).toEqual([
      { id: 'a', y: 0, x: 0, w: 2, h: 2 },
      { id: 'b', y: 0, x: 2, w: 1, h: 1 },
      { id: 'c', y: 1, x: 2, w: 1, h: 1 },
      { id: 'd', y: 1, x: 3, w: 1, h: 1 },
    ])
  })

  test('createGrid works', () => {
    const grid = createGrid([
      { id: 'a', y: 0, x: 0, w: 2, h: 2 },
      { id: 'b', y: 0, x: 2, w: 1, h: 1 },
      { id: 'c', y: 1, x: 2, w: 1, h: 1 },
      { id: 'd', y: 1, x: 3, w: 1, h: 1 },
    ])
    expect(grid).toEqual([
      ['a', 'a', 'b', '-'],
      ['a', 'a', 'c', 'd'],
    ])
  })

  test('sorting', () => {
    const areas = [
      { id: 'b', y: 0, x: 2, w: 2, h: 1 },
      { id: 'a', y: 0, x: 0, w: 2, h: 2 },
      { id: 'd', y: 1, x: 3, w: 1, h: 1 },
      { id: 'c', y: 1, x: 2, w: 1, h: 1 },
    ]
    const result = helper.sortGridAreas(areas)
    expect(result).toEqual([
      { id: 'a', y: 0, x: 0, w: 2, h: 2 },
      { id: 'b', y: 0, x: 2, w: 2, h: 1 },
      { id: 'c', y: 1, x: 2, w: 1, h: 1 },
      { id: 'd', y: 1, x: 3, w: 1, h: 1 },
    ])
  })

  test('move-down', () => {
    const areas = createGridAreas([
      ['a'],
      ['b'],
    ])
    const target = { id: 'a', y: 1, x: 0, w: 1, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(2)
    expect(grid[0]).toEqual(['b'])
    expect(grid[1]).toEqual(['a'])
  })

  test('move-up', () => {
    const areas = createGridAreas([
      ['a'],
      ['b'],
    ])
    const target = { id: 'b', y: 0, x: 0, w: 1, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(2)
    expect(grid[0]).toEqual(['b'])
    expect(grid[1]).toEqual(['a'])
  })

  test('complex move-down', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', 'b'],
      ['a', 'a', 'c', 'd'],
    ])
    const target = { id: 'c', y: 0, x: 2, w: 1, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(3)
    expect(grid[0]).toEqual(['a', 'a', 'c', '-'])
    expect(grid[1]).toEqual(['a', 'a', 'b', 'b'])
    expect(grid[2]).toEqual(['-', '-', '-', 'd'])
  })

  test('complex move-up', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', 'c'],
      ['a', 'a', 'd', 'd'],
    ])
    const target = { id: 'b', y: 1, x: 2, w: 1, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(3)
    expect(grid[0]).toEqual(['a', 'a', '-', 'c'])
    expect(grid[1]).toEqual(['a', 'a', 'b', '-'])
    expect(grid[2]).toEqual(['-', '-', 'd', 'd'])
  })

  test('move-left', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', 'b'],
      ['a', 'a', 'c', 'c'],
    ])
    const target = { id: 'b', y: 0, x: 1, w: 2, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(3)
    expect(grid[0]).toEqual(['-', 'b', 'b', '-'])
    expect(grid[1]).toEqual(['a', 'a', 'c', 'c'])
    expect(grid[2]).toEqual(['a', 'a', '-', '-'])
  })

  test('complex move-left', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', 'b'],
      ['a', 'a', 'c', 'c'],
    ])
    const target = { id: 'c', y: 1, x: 1, w: 2, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(4)
    expect(grid[0]).toEqual(['-', '-', 'b', 'b'])
    expect(grid[1]).toEqual(['-', 'c', 'c', '-'])
    expect(grid[2]).toEqual(['a', 'a', '-', '-'])
    expect(grid[3]).toEqual(['a', 'a', '-', '-'])
  })

  test('add area', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', 'b'],
      ['a', 'a', 'c', 'c'],
    ])
    const target = { id: 'd', y: 0, x: 0, w: 2, h: 1 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(3)
    expect(grid[0]).toEqual(['d', 'd', 'b', 'b'])
    expect(grid[1]).toEqual(['a', 'a', 'c', 'c'])
    expect(grid[2]).toEqual(['a', 'a', '-', '-'])
  })

  test('resize area', () => {
    const areas = createGridAreas([
      ['a', 'a', 'b', 'b'],
      ['a', 'a', 'c', 'c'],
    ])
    const target = { id: 'b', y: 0, x: 1, w: 3, h: 2 }
    const result = helper.calculateY(areas, target)
    const grid = createGrid(result)
    expect(grid).toHaveLength(4)
    expect(grid[0]).toEqual(['-', 'b', 'b', 'b'])
    expect(grid[1]).toEqual(['-', 'b', 'b', 'b'])
    expect(grid[2]).toEqual(['a', 'a', 'c', 'c'])
    expect(grid[3]).toEqual(['a', 'a', '-', '-'])
  })
})