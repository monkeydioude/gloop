import Fragment from "../displayFragment/Fragment"
import Renderer from "../graphicEngine/Renderer"
import Text from "./Text"

export default class Centered implements Text {
    constructor (private label: string, private size: number, private fontFamily: string){}
    
    getText(): string {
        return this.label
    }

    getFontFamily(): string {
        return this.fontFamily
    }

    getSize(): number {
        return this.size
    }

    write(f: Fragment | Renderer): void {
        
    }
}