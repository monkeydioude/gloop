import GameEngine, { GameUpdate } from "./GameEngine"

export default class Stateless implements GameEngine {
    private toUpdate: GameUpdate[] = []

    update(cb: (T: number) => void): void {
        this.toUpdate.push(cb)
    }

    doUpdates(T: number): void { 
        for (var i in this.toUpdate) {
            this.toUpdate[i](T)
        }
    }
}