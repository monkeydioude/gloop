import {Renderer} from "../renderer"
import {XY} from "../xy"

export class Img {
    dx: number
    dy: number
    w: number
    h: number
    src: string
    asset: HTMLImageElement

    constructor(public name: string, data: any) {
        if (data.src === undefined) {
            console.error("An Image requires a source") ;
        }
        if (data.dx === undefined) {
            data.dx = 0
        }
        if (data.dy === undefined) {
            data.dy = 0
        }
        if (data.w === undefined) {
            data.w = 64
        }
        if (data.h === undefined) {
            data.h = 64
        }
        this.dx = data.dx
        this.dy = data.dy
        this.w = data.w
        this.h = data.h
        this.src = data.src
    }

    getDecalX(): number {
        return this.dx
    }

    addDecalX(x: number): void {
        this.dx += x
    }

    getDecalY(): number {
        return this.dy
    }

    addDecalY(y: number): void {
        this.dy += y
    }

    getDecal(): XY {
        return new XY (
            this.getDecalX(),
            this.getDecalY()
        )
    }

    getAsset(): HTMLImageElement {
        return this.asset
    }

    setAsset(i: HTMLImageElement): void {
        this.asset = i
    }

    copy(): Img {
        let a = new Img(this.name, {
            dx: this.dx,
            dy: this.dy,
            w: this.w,
            h: this.w,
            src: this.src
        })
        a.setAsset(this.getAsset())
        return a
    }

    render(renderer: Renderer, x: number, y: number, T?: number): void {
        renderer.drawImage(this.getAsset(), x + this.getDecalX(), y + this.getDecalY(), this.w, this.h)
    }

    loadWithCallback(cb: any) {
        this.asset = new Image()
        this.asset.src = this.src
        this.asset.crossOrigin = "Anonymous"
        this.asset.onload = cb
    }
}
