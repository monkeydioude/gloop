import GameEngine, { GameUpdate } from "./gameEngine/GameEngine"
import GraphicEngine, { GraphicUpdate } from "./graphicEngine/GraphicEngine"
import Stateless from "./gameEngine/Stateless"
import Renderer from "./graphicEngine/Renderer"
import Loop from "./loop/Loop"
import Canvas from "./canvas/Canvas"

export interface Engine {
    Update(cb: GameUpdate): void
    Display(cb: GraphicUpdate): void
    Start(): void
    SetCanvasID(boardID: string, bufferID: string): void
}

export default class Gloop {
    
}

export class Mini implements Engine {
    private GameEngine: GameEngine
    private GraphicEngine: GraphicEngine
    private Loop: Loop

    constructor(fps: number, canvasBoardID: string, canvasBufferID: string) {
        this.GraphicEngine = new Renderer()
        this.SetCanvasID(canvasBoardID, canvasBufferID)
        this.GameEngine = new Stateless()
        this.Loop = new Loop(fps, this.GraphicEngine, this.GameEngine)
    }

    SetCanvasID(boardID: string, bufferID: string): void {
        this.GraphicEngine.setCanvas(new Canvas(boardID), new Canvas(bufferID))
    }

    Update(cb: GameUpdate): void {
        this.GameEngine.update(cb)
    }

    Display(cb: GraphicUpdate): void {
        this.GraphicEngine.display(cb)
    }

    Start(): void {
        this.Loop.start()
    }
}