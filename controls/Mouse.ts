import Canvas from "../canvas/Canvas";
import Event from "../Event"

let c: Canvas
let absX: number
let absY: number

function getCoordinates(): number[] {
    const rect = c.canvas.getBoundingClientRect()
    return [
        absX - rect.left,
        absY - rect.top
    ]
}

function init(canvas: Canvas) {
    c = canvas
    c.canvas.addEventListener('mousemove', (evt: any) => {
        absX = evt.clientX
        absY = evt.clientY
    })
}

function onClick(cb: (evt: any) => any) {
    c.canvas.addEventListener('click', (evt: any) => {
        absX = evt.clientX
        absY = evt.clientY
        cb(getCoordinates())
    })
}

export default {
    getCoordinates: getCoordinates,
    init: init,
    onClick: onClick
}