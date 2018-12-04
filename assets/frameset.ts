import {Renderer} from "../renderer"
import {Img} from "./img"
import {Frame} from "./frame"

export class Frameset {
    frames: Frame[] = []
    fit: number = 0
    currentFrame: Frame

    constructor(public name: string, public sprite: Img) {
    }

    render(renderer: Renderer, x: number, y: number, T?: number): void {
        this.setCurrentFrame()

        this.currentFrame.render(renderer, x, y, T)
        this.iterateFrame()
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

    getAsset(): HTMLImageElement {
        return this.sprite.getAsset()
    }

    copy(): Frameset {
        let f: Frameset = new Frameset(this.name, this.sprite.copy())
        f.frames = this.frames
        f.fit = 0
        f.setCurrentFrame()
        return f
    }
}
