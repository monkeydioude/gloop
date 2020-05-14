import { Fragment } from "../displayFragment/Fragment";
import Mouse from '../controls/Mouse'

class Click {
    private f: Fragment

    on(f: Fragment) {
        this.f = f
        return this
    }

    do(cb: (coord: number[]) => void): void {
        Mouse.onClick((coord: number[]) => {
            if (!this.f.isInside(coord[0], coord[1])) {
                return
            }
            cb(this.f.getRelativeXY(coord[0], coord[1]))
        })
    }
}

export default new Click()