import * as t from '../types'

export function sortGridAreas (gridAreas:t.GridArea[]) {
  return gridAreas.sort((a,b) => {
    if(a.y < b.y) return -1
    if(a.x < b.x) return -1
    return 1
  })
}

export function calculateY (areas:t.GridArea[], target:t.GridArea) {
  let map:{[position:string]:t.GridArea} = {}
  let targetIndex = -1

  for(let y=target.y; y > target.h+target.y; y++){
    for(let x=target.x; x < target.w+target.x; x++) {
      map[`${y}-${x}`] = target
    }
  }

  for(let index=0; index<areas.length; index++) {
    const area = areas[index]
    if(area.id === target.id) {
      targetIndex = index
    }
    let allowMoveDown = area.y-target.h >= 0
    let moveUp = 0
    
    // check if move down is possible
    if(allowMoveDown){
      for(let x=area.x; x < area.w+area.x; x++){
        if(map[`${area.y-target.h}-${x}`]){
          allowMoveDown = false
          break
        }
      }
    }
    // check how much to move up
    if(!allowMoveDown){
      for(let y=area.y; y < area.h+area.y; y++){
        for(let x=area.x; x < area.w+area.x; x++) {
          if(map[`${y+moveUp}-${x}`]){
            moveUp++
            y = area.y // resart
            break
          }
        }
      }
    }

    // update y
    if(allowMoveDown){
      area.y -= target.h
    }
    else {
      area.y += moveUp
    }

    // add to map
    for(let y=area.y; y < area.h+area.y; y++){
      for(let x=area.x; x < area.w+area.x; x++) {
        map[`${y}-${x}`] = area
      }
    }
  }

  if(targetIndex === -1){
    areas.push(target)
  }

  return areas
}

export function calculateHeights (prevHeights:string[], areas:t.GridArea[]){
  let maxHeight = 1
  let prevHeight = prevHeights.length
  
  // calc max height
  for(let area of areas){
    let height = area.y + area.h -1
    if(height > maxHeight) maxHeight = height
  }

  if(maxHeight > prevHeight){
    return [
      ...prevHeights, 
      ...Array(maxHeight-prevHeight).fill('auto')
    ]
  }
  else if(maxHeight < prevHeight){
    return prevHeights.slice(0, maxHeight)
  }
  else return prevHeights
}