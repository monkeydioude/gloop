import {Renderer} from "../renderer"

export interface Asset {
    render(renderer: Renderer, x: number, y: number, T?: number): void
    getAsset(): any
}