import Fragment from "../displayFragment/Fragment"
import Renderer from "../graphicEngine/Renderer";

export default interface Text {
    getText(): string
    getFontFamily(): string
    getSize(): number
    write(f: Fragment | Renderer): void
}