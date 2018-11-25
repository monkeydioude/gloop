import {Renderer} from "../renderer"
import {Img} from "./img"
import {Frame} from "./frame"

export class Frameset {
    frames: Frame[] = []
    fit: number = 0
    currentFrame: Frame

    constructor(public name: string, framesData: any, public sprite: Img) {
        this.parseFrames(framesData)
    }

    render(renderer: Renderer, x: number, y: number, T?: number): void {
        this.setCurrentFrame()

        this.currentFrame.render(renderer, x, y, T)
        this.iterateFrame()
    }

    getAsset(): any {
        return this.sprite.getAsset()
    }

    parseFrames(framesData: any): void {
        for (let i = 0; i < framesData.length; i++) {
            this.frames.push(new Frame(framesData[i].frame, framesData[i].duration, this.sprite))
        }
        this.currentFrame = this.frames[0]
    }

    protected setCurrentFrame(): void {
        if (this.fit >= this.frames.length) {
            this.fit = 0
        }
        this.currentFrame = this.frames[this.fit]
    }

    protected shouldIterateFrame(): boolean {
        return this.currentFrame.stackedTime >= this.currentFrame.duration
    }

    protected iterateFrame(): void {
        if (!this.shouldIterateFrame()) {
            return
        }
        this.currentFrame.reset()
        this.fit++
    }
}
