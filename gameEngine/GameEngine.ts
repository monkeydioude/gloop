export interface GameUpdate {
    (T: number): void
}

export default interface GameEngine {
    update(cb: (T: number) => void, name?: string): void
    doUpdates(T: number): void
}