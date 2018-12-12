import {Renderer} from "./renderer";
import {DisplayUpdater} from "./updater/displayUpdater"
import {Updater} from "./updater/updater"
import {Loader} from "./assets/loader"
import {Core} from "./core"

export class StateMachine {
    states: {[key: string]: (core: Core, state: StateMachine) => void} = {}
    currentState: string

    constructor(public core: Core) {
    }

    addStateBehavior(name: string, f: (core: Core, state: StateMachine) => void): void {
        this.states[name] = f
    }
    
    hasState(name: string): boolean {
        return !(this.states[name] == undefined)
    }

    removeState(name: string): boolean {
        if (!this.hasState(name)) {
            return false
        }

        delete this.states[name]
        return true
    }

    setState(state: string): boolean {
        if (!this.hasState(state)) {
            return false
        }
    
        console.info("Setting State from", this.currentState, "to", state)

        this.currentState = state
        this.states[state](this.core, this)

        return true
    }

    getState(): string {
        return this.currentState
    }
}