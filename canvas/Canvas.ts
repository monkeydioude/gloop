export default class Canvas {
    canvas: any
    ctx: any

    constructor(canvasID: string) {
        this.canvas = document.querySelector(canvasID)
        this.ctx = this.canvas.getContext("2d")
    }

    drawLine(fX: number, fY: number, tX: number, tY: number, thickness?: number): void {
        if (thickness == undefined){ 
            thickness = 1
        }
        this.ctx.beginPath()
        this.ctx.moveTo(fX, fY)
        this.ctx.lineTo(tX, tY)
        this.ctx.lineWidth = thickness
        this.ctx.stroke()
    }

    drawRect(fX: number, fY: number, w: number, h: number, color: string, thickness?: number): void {
        const colorBefore = this.ctx.strokeStyle
        if (thickness == undefined) {
            thickness = 1
        }
        this.ctx.beginPath()
        this.ctx.rect(fX, fY, w, h)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = thickness
        this.ctx.stroke()
        this.ctx.strokeStyle = colorBefore
    }

    fillRect(fX: number, fY: number, w: number, h: number, color: string): void {
        const colorBefore = this.ctx.fillStyle
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.fillRect(fX, fY, w, h)
        this.ctx.fillStyle = colorBefore
    }

    drawImage(img: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number): void {
        if (!x) x = 0
        if (!y) y = 0
        if (!w) w = this.width()
        if (!h) h = this.height()
        if (!sx) sx = 0
        if (!sy) sy = 0

        this.ctx.drawImage(img, sx, sy, w, h, x, y, w, h);
    }

    writeText(text: string, x: number, y: number, size?: number, fontFamily?: string) {
        if (size != undefined && fontFamily != undefined) {
            this.ctx.font = size +"px "+ fontFamily;
        }
        this.ctx.fillText(text, x, y);
    }

    width(): number {
        return this.canvas.width
    }

    height(): number {
        return this.canvas.height
    }

    //  Draw ImageData element onto canvas
    drawImageData(imgData: ImageData, x: number, y: number, w: number, h: number, dx: number, dy: number): void {
        this.ctx.putImageData(imgData, x, y, dx, dy, w, h);
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.width(), this.height());
    }

    // snapshot captures the canvas and returns its ImageData equivalent
    snapshot(): ImageData {
        return this.ctx.getImageData(0, 0, this.width(), this.height());
    }
}