import Canvas from "../canvas/Canvas"

export interface GraphicUpdate {
    (T: number, graphicEngine: GraphicEngine): void
}

export default interface GraphicEngine {
    setCanvas(board: Canvas, buffer: Canvas): void
    display(cb: (T: number, graphicEngine: GraphicEngine) => void, name?: string): void
    doDisplays(T: number): void
    render(): void
}