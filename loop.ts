import {Updater} from "./updater/updater"
import {StateMachine} from "./stateMachine"

export class Loop {
    cbSeed: NodeJS.Timeout
    dSeed: NodeJS.Timeout
    startingConditions: any = []
    pT: number = 0
    fps: number
    iF: number
    miF: number

    constructor(fps: number, public state: StateMachine, public displayUpdater: Updater, public dataUpdater: Updater) {
        this.setFrequencies(fps)
    }
    /**
     * setFrequencies sets fps, iF & miF
     * (iF = 1 / FPS, time between too frames)
     * (miF = iF * 1000, time between frames in milliseconds)
     */
    setFrequencies(fps: number): void {
        this.fps = fps
        this.iF = 1/fps
        this.miF = 1000 * this.iF
        console.info("setFrequencies("+fps+") = {", "\n\tfps:", fps, "\n\tiF:", this.iF, "\n\tmiF:", this.miF, "\n}")
    }

    // pause cancels data & display loops
    pause(): void {
        console.info("paused")
        clearTimeout(this.cbSeed)
        clearTimeout(this.dSeed)
    }
    // start triggers data & display update loops
    start(): void {
        if (!this.canStart()) {
            setTimeout(this.start.bind(this), this.miF)
            return
        }

        console.info("started")
        setTimeout((): void => this.dataLoop(0), 30)
        setTimeout((): void => this.displayLoop(0), 45)
    }

    // canStart checks if every startingConditions are met
    canStart(): boolean {
        for (let i = 0; i < this.startingConditions.length; i++) {
            if (this.startingConditions[i]() === false) {
                return false
            }
        }
        return true
    }

    // addStartingConditions adds bulk starting conditions (array of func)
    addStartingConditions(conditions: any): void {
        this.startingConditions = conditions
    }

    // dataLoop is an iteration of the data loop, it calls itself perpetually through setTimeout
    dataLoop(T: number): void {
        let nT = window.performance.now()

        this.dataUpdater.update(this.state.getState(), T)
        this.cbSeed = setTimeout((): void => this.dataLoop(this.miF), T - (window.performance.now() - nT))
    }

    // displayLoop is an iteration of the display loop, it calls itself perpetually through setTimeout
    displayLoop(T: number): void {
        let nT = window.performance.now()

        this.displayUpdater.update(this.state.getState(), T)
        
        this.dSeed = setTimeout((): void => this.displayLoop(this.miF), T - (window.performance.now() - nT))
    }
}
