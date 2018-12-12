import {Updater} from "./updater"
import {Renderer} from "../renderer"

export class DisplayUpdater extends Updater {
    constructor(public renderer: Renderer) {
        super()
    }

    update(mode: string, T: number, entity?: any): number {
        let updStatus = super.update(mode, T, this.renderer)

        if (updStatus > 0) {
            this.renderer.render()
        }

        return updStatus
    }
}