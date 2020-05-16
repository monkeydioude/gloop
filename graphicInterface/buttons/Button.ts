import Fragment from '../../displayFragment/Fragment'

export default interface Button {
    getSize(): [number, number]
    getLabel(): string
    display(x: number, y: number, fragment: Fragment): void
}