import Button from "./Button";
import Fragment from "../../displayFragment/Fragment";

export default class Simple implements Button {
    public fontFamily: string = "Meiryo, Yu Gothic"
    public fontSize: number = 20
    public borderThickness: number = 2
    public borderColor: string = "#AD1CC7"

    constructor(private label: string, private width: number, private height: number, fontSize?: number, fontFamily?: string) {
        if (fontFamily != undefined) {
            this.fontFamily = fontFamily
        }
        if (fontSize != undefined) {
            this.fontSize = fontSize
        }
    }

    getSize(): [number, number] {
        return [ this.width, this.height ]
    }

    getLabel(): string {
        return this.label
    }

    display(x: number, y: number, f: Fragment): void {
        const buttonF = f.spawnChildren(x, y, this.width, this.height)

        buttonF.drawRect(0, 0, this.width, this.height, this.borderColor, this.borderThickness)
        buttonF.writeText(this.label, 0, 0, this.fontSize, this.fontFamily)
    }
}