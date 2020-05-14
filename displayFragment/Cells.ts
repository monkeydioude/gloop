import { Fragment } from "./Fragment";
import Renderer from "../graphicEngine/Renderer";

export default class Cells implements Fragment {
    constructor(
        private x: number, 
        private y: number, 
        private nbColumns: number, 
        private nbLines:number, 
        private cellWidth: number, 
        private cellHeight: number, 
        private renderer: Renderer) {
    }

    // @TODO
    drawLine(fX: number, fY: number, tX: number, tY: number, thickness?: number): void {
        // this.renderer.drawLine(this.x + fX, this.y + fY, this.x + tX, tY, thickness)
    }


    drawRect(cellX: number, cellY: number, w: number, h: number, color: string, thickness?: number): void {
        if (cellX < 0) {
            cellX = this.nbColumns + cellX
        }
        if (cellY < 0) {
            cellY = this.nbLines + cellY
        }
        this.renderer.drawRect(this.x + (cellX * this.cellWidth), this.y + (cellY * this.cellHeight), w, h, color, thickness)
    }

    makeBorder(x: number, y: number, color: string) {
        this.drawRect(x, y, this.cellWidth, this.cellHeight, color)
    }
    
    fillRect(fX: number, fY: number, w: number, h: number, color: string): void {
        // this.renderer.fillRect(this.x + fX, this.y + fY, w, h, color)
    }

    // Draw Image element onto engine's canvas
    drawImage(image: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number): void {
        this.renderer.drawImage(image, this.x + x, this.y + y, w, h, this.x + sx, this.x + sy)
    }

    writeText(text: string, x: number, y: number, size?: number, fontFamily?: string) {
        if (size == undefined) {
            size = 10
        }
        if (x < 0) {
            x = this.nbColumns + x
        }
        if (y < 0) {
            y = this.nbLines + y
        }
        this.renderer.writeText(text, this.x + (x * this.cellWidth) + (this.cellWidth / 2), this.y + (y * this.cellHeight) + (this.cellHeight / 2), size, fontFamily)
    }

    display(cb: (T: number, f: Fragment) => void): Fragment {
        this.renderer.display((T: number, r: Renderer) => {
            cb(T, this)
        })
        return this
    }

    update(cb: (T: number, f: Fragment) => void): Fragment {
        this.renderer.display((T: number, r: Renderer) => {
            cb(T, this)
        })
        return this
    }

    getWidth(): number {
        return this.cellWidth * this.nbColumns
    }

    getHeight(): number {
        return this.cellHeight * this.nbLines
    }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    getRelativeXY(x: number, y: number): number[] {
        return [
            Math.floor(x / this.cellWidth),
            Math.floor(y / this.cellHeight)
        ]
    }

    isInside(x: number, y: number): boolean {
        return x >= this.x &&
            x <= this.x + this.getWidth() &&
            y >= this.y &&
            y <= this.y + this.getHeight()
    }
}