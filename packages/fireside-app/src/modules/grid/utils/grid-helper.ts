import * as t from '../types'
import produce from 'immer'

export function sortGridAreas (gridAreas:t.GridArea[]) {
  return gridAreas.sort((a,b) => {
    if(a.y < b.y) return -1
    if(a.x < b.x) return 1
    return 1
  })
}

export function calculateY (areas:t.GridArea[], target:t.GridArea) {
  return produce(areas, areas => {
    let map:{[position:string]:t.GridArea} = {}
    let targetIndex = -1
  
    for(let y=target.y; y < target.h+target.y; y++){
      for(let x=target.x; x < target.w+target.x; x++) {
        map[`${y}-${x}`] = target
      }
    }
  
    for(let index=0; index<areas.length; index++) {
      const area = areas[index]
      if(area.id === target.id) {
        targetIndex = index
        areas[index] = target
        continue
      }
      let allowMoveDown = (area.y-target.h) >= 0 && area.y !== target.y+1
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
        const shouldUpdate = () => {
          for(let y=area.y; y < area.h+area.y; y++){
            for(let x=area.x; x < area.w+area.x; x++) {
              if(map[`${y+moveUp}-${x}`]){
                return true
              }
            }
          }
        }
        while(shouldUpdate()) moveUp++
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
  })
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

export function applyGravity (areas: t.GridArea[]){
  return produce(areas, areas => {
    let map:{[position:string]:boolean} = {}
  
    for(let area of areas){
      let moveDown = 0
      const canMoveDown = () => {
        if(area.y-moveDown <= 0) {
          return false
        }
        for(let y=area.y; y < area.y + area.h; y++){
          for(let x=area.x; x < area.x + area.w; x++){
            if(map[`${y-moveDown-1}-${x}`]) {
              return false
            }
          }
        }
        return true
      }
  
      while(canMoveDown()) moveDown++
  
      if(moveDown){
        area.y = area.y - moveDown
      }
  
      for(let y=area.y; y < area.y + area.h; y++){
        for(let x=area.x; x < area.x + area.w; x++){
          map[`${y}-${x}`] = true
        }
      }
    }
  })
}