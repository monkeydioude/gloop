import Fragment from "./Fragment"
import Renderer from "../graphicEngine/Renderer"


export default class Area implements Fragment {
    private tx: number
    private ty: number
    constructor(private x: number, private y: number, private width:number, private height: number, private renderer: Renderer) {
        this.tx = this.x + this.width
        this.ty = this.y + this.width
    }

    // Draw a line onto engine's canvas
    drawLine(fX: number, fY: number, tX: number, tY: number, thickness?: number): void {
        fX = (this.tx + fX) % this.tx
        fY = (this.ty + fY) % this.ty
        tX = (this.tx + fX) % this.tx
        tY = (this.ty + fY) % this.ty
        this.renderer.drawLine(this.x + fX, this.y + fY, this.x + tX, tY, thickness)
    }

    drawRect(fX: number, fY: number, w: number, h: number, color: string, thickness?: number): void {
        fX = (this.tx + fX) % this.tx
        fY = (this.ty + fY) % this.ty
        w = (this.width + w) % this.width
        h = (this.height + h) % this.height

        this.renderer.drawRect(this.x + fX, this.y + fY, w, h, color, thickness)
    }

    fillRect(fX: number, fY: number, w: number, h: number, color: string): void {
        fX = (this.tx + fX) % this.tx
        fY = (this.ty + fY) % this.ty
        this.renderer.fillRect(this.x + fX, this.y + fY, w, h, color)
    }

    // Draw Image element onto engine's canvas
    drawImage(image: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number): void {
        x = (this.tx + x) % this.tx
        y = (this.ty + y) % this.ty
        if (sx != undefined) {
            sx = (this.tx + sx) % this.tx
        }
        if (sy != undefined) {
            sy = (this.ty + sy) % this.ty
        }
        this.renderer.drawImage(image, this.x + x, this.y + y, w, h, this.x + sx, this.x + sy)
    }

    writeText(text: string, x: number, y: number, size?: number, fontFamily?: string, color?: string) {
        if (size == undefined) {
            size = 10
        }
        this.renderer.writeText(text, this.x + x, this.y + y, size, fontFamily, color)
    }

    describeFragment(x: number, y: number, width: number, height: number): void {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    display(cb: (T: number, f: Fragment) => void): Fragment {
        this.renderer.display((T: number, r: Renderer) => {
            cb(T, this)
        })
        return this
    }

    getWidth(): number {
        return this.width
    }
    getHeight(): number {
        return this.height
    }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }
    getRelativeXY(x: number, y: number): number[] {
        return [
            this.x,
            this.y
        ]
    }

    //@TODO
    isInside(x: number, y: number): boolean {
        return true
    }

    spawnChildren(x: number, y: number, width: number, height: number) {
        return new Area(this.x + x, this.y + y, width, height, this.renderer)
    }
}