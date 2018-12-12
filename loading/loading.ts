import {Loop} from "../loop"
import {Renderer} from "../renderer"

export interface Loading {
    begin(loop: Loop, renderer: Renderer): void
    end(loop: Loop, renderer: Renderer): void
    endConditions(conds: Array<() => boolean>): void
}