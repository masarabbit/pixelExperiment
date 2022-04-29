import { drawData } from '../drawData.js'

const styleTarget = ({ target, w, h, x, y }) =>{
  if (w) target.style.width = `${w}px`
  if (h) target.style.height = `${h}px`
  if (x) target.style.left = `${x}px`
  if (y) target.style.top = `${y}px`
}

const calcX = cell => cell % drawData.column
const calcY = cell => Math.floor(cell / drawData.column)

const resizeCanvas = ({ canvas, w, h }) =>{
  canvas.setAttribute('width', w)
  canvas.setAttribute('height', h)
}

const addEvents = (target, action, event, array) =>{
  array.forEach(a => event === 'remove' ? target.removeEventListener(a, action) : target.addEventListener(a, action))
}

const mouse = {
  up: (t, e, a) => addEvents(t, a, e, ['mouseup', 'touchend']),
  move: (t, e, a) => addEvents(t, a, e, ['mousemove', 'touchmove']),
  down: (t, e, a) => addEvents(t, a, e, ['mousedown', 'touchstart']),
  enter: (t, e, a) => addEvents(t, a, e, ['mouseenter', 'touchstart']),
  leave: (t, e, a) => addEvents(t, a, e, ['mouseleave', 'touchmove'])
}

const nearestN = (n, denom) => n === 0 ? 0 : (n - 1) + Math.abs(((n - 1) % denom) - denom)

const blankRemoved = arr => arr.filter(dot => dot)

const sortByFreqRemoveBlankAndDuplicates = arr =>{  
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
  const orderedByFrequency = blankRemoved(arr).map(ele =>[ele, countOccurrences(blankRemoved(arr), ele)]).sort((a, b) => b[1] - a[1])  
  return [...new Set(orderedByFrequency.map(ele => ele[0]))]
}

export {
  styleTarget,
  resizeCanvas,
  mouse,
  nearestN,
  calcX,
  calcY,
  sortByFreqRemoveBlankAndDuplicates
}