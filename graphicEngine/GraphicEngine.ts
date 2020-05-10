import Renderer from './Renderer'

export default interface Display {
    display(T: number, renderer: Renderer): void
}

export interface GraphicUpdate {
    (T: number, renderer: Renderer): void
}