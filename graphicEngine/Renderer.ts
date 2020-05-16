import Canvas from "../canvas/Canvas"
import { GraphicUpdate } from "./GraphicEngine"
import Event, { EventType } from "../Event"

export default class Renderer {
    private scene: Canvas
    private buffer: Canvas
    private toDisplay: GraphicUpdate[] = []
    public xOverload: number
    public yOverload: number

    constructor(xOverload?: number, yOverload?: number) {
        this.xOverload = xOverload
        this.yOverload = yOverload

        Event.on(EventType.SCENE_WILL_CHANGE, () => {
            this.toDisplay = []
        })
    }

    setCanvas(scene: Canvas, buffer: Canvas): void {
        this.scene = scene
        this.buffer = buffer
    }

    getCanvas(): Canvas {
        return this.scene
    }
    
    display(cb: (T: number, renderer: Renderer) => void): void {
        this.toDisplay.push(cb)
    }

    doDisplays(T: number): void {
        for (var i in this.toDisplay) {
            this.toDisplay[i](T, this)
        }
    }

    // Draw a line onto engine's canvas
    drawLine(fX: number, fY: number, tX: number, tY: number, thickness?: number): void {
        this.buffer.drawLine(fX, fY, tX, tY, thickness)
    }

    drawRect(fX: number, fY: number, w: number, h: number, color: string, thickness?: number): void {
        this.buffer.drawRect(fX+0.5, fY+0.5, w, h, color, thickness)
    }

    fillRect(fX: number, fY: number, w: number, h: number, color: string): void {
        this.buffer.fillRect(fX+0.5, fY+0.5, w, h, color)
    }

    // Draw Image element onto engine's canvas
    drawImage(image: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number): void {
        this.buffer.drawImage(image, x, y, w, h, sx, sy)
    }

    writeText(text: string, x: number, y: number, size?: number, fontFamily?: string, color?: string) {
        if (size == undefined) {
            size = 20
        }
        const shalf = size/2
        this.buffer.writeText(text, x - shalf, y + shalf, size, fontFamily, color)
    }

    render(): void {
        // this.scene.clear();
        let imgData: ImageData = this.buffer.ctx.getImageData(
            0, 0, this.buffer.width(), this.buffer.height()
        )
        this.scene.drawImageData(
            imgData,
            0,
            0,
            this.scene.width(),
            this.scene.height(),
            0,
            0
        )
        this.buffer.clear();
    }

    drawImageData(imgData: ImageData, x: number, y: number, w: number, h: number, dx: number, dy: number) {
        this.buffer.drawImageData(imgData, x, y, w, h, dx, dy);
    }
}
