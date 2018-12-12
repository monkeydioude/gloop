import {Renderer} from "../renderer"
import {Asset} from "./asset"

export class NotLoadedYet {
    asset: Asset
    constructor(public assets: {[name: string]: Asset}, public name: string) {
    }

    getAsset(): any {
        if (this.assets[this.name] == undefined) {
            return null
        }
        return this.assets[this.name].getAsset()
    }

    copy(): Asset {
        if (this.assets[this.name] == undefined || this.assets[this.name] == this) {
            return new NotLoadedYet(this.assets, this.name)
        }
        return this.assets[this.name].copy()
    }

    render(renderer: Renderer, x: number, y: number, T?: number): void {
        if (this.assets[this.name] == undefined || this.assets[this.name] == this) {
            return
        }

        if (this.asset == null) {
            this.asset = this.assets[this.name].copy()
        }
        this.asset.render(renderer, x, y, T)
    }
}
