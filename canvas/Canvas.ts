export default class Canvas {
    canvas: any
    c: any

    constructor(canvasID: string) {
        this.canvas = document.querySelector(canvasID)
        this.c = this.canvas.getContext("2d")
    }

    drawLine(fX: number, fY: number, tX: number, tY: number): void {
        this.c.moveTo(fX, fY)
        this.c.lineTo(tX, tY)
        this.c.stroke()
    }

    drawImage(img: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number): void {
        if (!x) x = 0
        if (!y) y = 0
        if (!w) w = this.width()
        if (!h) h = this.height()
        if (!sx) sx = 0
        if (!sy) sy = 0

        this.c.drawImage(img, sx, sy, w, h, x, y, w, h);
    }

    width(): number {
        return this.canvas.width
    }

    height(): number {
        return this.canvas.height
    }

    //  Draw ImageData element onto canvas
    drawImageData(imgData: ImageData, x: number, y: number, w: number, h: number, dx: number, dy: number): void {
        this.c.putImageData(imgData, x, y, dx, dy, w, h);
    }

    clear(): void {
        this.c.clearRect(0, 0, this.width(), this.height());
    }

    // snapshot captures the canvas and returns its ImageData equivalent
    snapshot(): ImageData {
        return this.c.getImageData(0, 0, this.width(), this.height());
    }
}