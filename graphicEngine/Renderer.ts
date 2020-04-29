import Canvas from "../canvas/Canvas"
import GraphicEngine, { GraphicUpdate } from "./GraphicEngine"

export default class Renderer implements GraphicEngine {
    scene: Canvas
    buffer: Canvas
    private toDisplay: GraphicUpdate[] = []

    setCanvas(scene: Canvas, buffer: Canvas): void {
        this.scene = scene
        this.buffer = buffer
    }
    
    display(cb: (T: number, graphicEngine: GraphicEngine) => void) {
        this.toDisplay.push(cb)
    }

    doDisplays(T: number) {
        for (var i in this.toDisplay) {
            this.toDisplay[i](T, this)
        }
    }

    // Draw a line onto engine's canvas
    drawLine(fX: number, fY: number, tX: number, tY: number) {
        this.buffer.drawLine(fX, fY, tX, tY)
    }

    // Draw Image element onto engine's canvas
    drawImage(image: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number) {
        this.buffer.drawImage(image, x, y, w, h, sx, sy)
    }

    render(): void {
        // this.scene.clear();
        let imgData: ImageData = this.buffer.c.getImageData(
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
