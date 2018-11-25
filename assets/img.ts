import {Renderer} from "../renderer"
import {XY} from "../xy"

export class Img {
    src: string
    dx: number
    dy: number
    w: number
    h: number
    asset: HTMLImageElement

    constructor(public name: string, data: any) {
        if (!data.hasOwnProperty("src")) {
            console.error("An Image requires a source") ;
        }
        if (!data.hasOwnProperty("dx")) {
            data.dx = 0
        }
        if (!data.hasOwnProperty("dy")) {
            data.dy = 0
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
        this.src = data.src
        this.dx = data.dx
        this.dy = data.dy
        this.w = data.w
        this.h = data.h
        this.asset = new Image()
        this.asset.src = data.src
        this.asset.crossOrigin = "Anonymous"
    }

    getDecalX(): number {
        return this.dx
    }

    getDecalY(): number {
        return this.dy
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

    render(renderer: Renderer, x: number, y: number) {
        renderer.drawImage(this.getAsset(), x + this.getDecalX(), y + this.getDecalY(), this.w, this.h)
    }

    loadWithCallback(cb: any) {
        this.asset.onload = cb
    }
}
