var Updater = require('./updater')

import {Renderer} from "./renderer"

export class Loop {
    cbSeed: NodeJS.Timeout
    dSeed: NodeJS.Timeout
    dataUpdater: any
    displayUpdater: any
    mode: string
    startingConditions: any = []
    pT: number = 0
    fps: number
    iF: number
    miF: number

    constructor(fps: number, public renderer: Renderer) {
        this.setFrequencies(fps)
        this.dataUpdater = new Updater("data")
        this.displayUpdater = new Updater("display")
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

    // setMode changes loop mode
    setMode(mode: string): void {
        console.info("Setting mode from", this.mode, "to", mode)
        this.mode = mode
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
            this.renderer.scene.c.fillText("Loading...", 360, 295)
            setTimeout(this.start.bind(this), this.miF)
            return;
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
        return true;
    }

    // addStartingConditions adds bulk starting conditions (array of func)
    addStartingConditions(conditions: any): void {
        this.startingConditions = conditions;
    }

    // dataLoop is an iteration of the data loop, it calls itself perpetually through setTimeout
    dataLoop(T: number): void {
        let nT = window.performance.now()

        this.dataUpdater.update(this.mode, T)
        this.cbSeed = setTimeout((): void => this.dataLoop(this.miF), T - (window.performance.now() - nT))
    }

    // displayLoop is an iteration of the display loop, it calls itself perpetually through setTimeout
    displayLoop(T: number): void {
        let nT = window.performance.now(),
            updStatus = 0;

        updStatus = this.displayUpdater.update(this.mode, T, this.renderer);
        
        if (updStatus > 0) {
            this.renderer.render();
        }
        this.dSeed = setTimeout((): void => this.displayLoop(this.miF), T - (window.performance.now() - nT));
    }
}
