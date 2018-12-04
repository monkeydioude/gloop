import {Renderer} from "../renderer"
import {Asset} from "./asset"

export class NotLoadedYet {
    constructor(public assets: {[name: string]: Asset}, public name: string) {
    }

    getAsset(): any {
        if (this.assets[this.name] == undefined) {
            return null
        }
        return this.assets[this.name].getAsset()
    }

    copy(): Asset {
        if (this.assets[this.name] == undefined) {
            return this
        }
        return this.assets[this.name].copy()
    }

    render(renderer: Renderer, x: number, y: number, T?: number): void {
        if (this.assets[this.name] == undefined) {
            return
        }
        this.assets[this.name].render(renderer, x, y, T)
    }
}
