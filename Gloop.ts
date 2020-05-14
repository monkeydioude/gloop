import GameEngine, { GameUpdate } from "./gameEngine/GameEngine"
import { GraphicUpdate } from "./graphicEngine/GraphicEngine"
import Stateless from "./gameEngine/Stateless"
import Renderer from "./graphicEngine/Renderer"
import Loop from "./loop/Loop"
import Canvas from "./canvas/Canvas"
import Area from "./displayFragment/Area"
import Cells from "./displayFragment/Cells"
import Mouse from "./controls/Mouse"
import ScenesHandler, { Scene } from "./scene/Scenes"

export interface Engine {
    update(cb: GameUpdate): void
    display(cb: GraphicUpdate): void
    start(): void
    setCanvasID(boardID: string, bufferID: string): void
}

export class Mini implements Engine {
    private gameEngine: GameEngine
    private renderer: Renderer
    private loop: Loop
    private scenes: ScenesHandler

    constructor(fps: number, canvasBoardID: string, canvasBufferID: string) {
        this.renderer = new Renderer()
        this.setCanvasID(canvasBoardID, canvasBufferID)
        this.gameEngine = new Stateless()
        this.loop = new Loop(fps, this.renderer, this.gameEngine)
        this.scenes = new ScenesHandler()
    }

    setCanvasID(boardID: string, bufferID: string): void {
        this.renderer.setCanvas(new Canvas(boardID), new Canvas(bufferID))
    }

    update(cb: GameUpdate): void {
        this.gameEngine.update(cb)
    }

    display(cb: GraphicUpdate): void {
        this.renderer.display(cb)
    }

    start(): void {
        this.loop.start()
    }

    getCanvasDimensions(): number[] {
        return [this.renderer.getCanvas().width(), this.renderer.getCanvas().height()]
    }

    newArea(x: number, y: number, width: number, height: number): Area {
        return new Area(x, y, width, height, this.renderer)
    }

    newCells(x: number, y: number, nbColumns: number, nbLines: number, cellWidth: number, cellHeight: number) {
        return new Cells(x, y, nbColumns, nbLines, cellWidth, cellHeight, this.renderer)
    }

    mouseInit() {
        Mouse.init(this.renderer.getCanvas())
    }

    addScene(name: string, scene: Scene) {
        this.scenes.add(name, scene)
    }

    switchScene(name: string) {
        const err = this.scenes.switch(name)

        if (err != null) {
            console.log(err)
        }
    }
}