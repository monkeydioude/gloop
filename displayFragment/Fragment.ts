export interface Fragment {
    drawLine(fX: number, fY: number, tX: number, tY: number, thickness?: number): void
    drawRect(fX: number, fY: number, w: number, h: number, color: string, thickness?: number): void
    fillRect(fX: number, fY: number, w: number, h: number, color: string): void
    drawImage(image: HTMLImageElement, x: number, y: number, w: number, h: number, sx?: number, sy?: number): void
    writeText(text: string, x: number, y: number, size?: number, fontFamily?: string): void
    display(cb: (T: number, f: Fragment) => void): Fragment
    getWidth(): number
    getHeight(): number
}
