import {Img} from "./img"
import {Renderer} from "../renderer"

export class Frame {
    sx: number
    sy: number
    w: number
    h: number
    stackedTime: number = 0

    constructor(frameData: any, public duration: number) {
        this.sx = frameData.x
        this.sy = frameData.y
        this.w = frameData.w
        this.h = frameData.h
    }

    render(renderer: Renderer, sprite: Img, x: number, y: number, T?: number): void {
        this.stackedTime += T
        renderer.drawImage(sprite.getAsset(), x + sprite.getDecalX(), y + sprite.getDecalY(), this.w, this.h, this.sx, this.sy)
    }

    reset() {
        this.stackedTime -= this.duration
        // this.stackedTime = 0
    }
}
