import Renderer from "../graphicEngine/Renderer"

export interface Asset {
    render(renderer: Renderer, x: number, y: number, T?: number): void
    getAsset(): any
    copy(): Asset
}
