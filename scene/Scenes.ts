import Event, { EventType } from "../Event"

export interface Scene {
    (scenes?: ScenesHandler): void
}

export default class ScenesHandler {
    private scenesCB: Map<string, Scene[]>
    private currentScene: string

    constructor() {
        this.scenesCB = new Map()
    }

    add(scene: string, cb: (obj?: any) => void): ScenesHandler {
        if (!this.scenesCB.has(scene)) {
            this.scenesCB.set(scene, [])
        }
        this.scenesCB.get(scene).push(cb)
        return this
    }

    switch(scene: string): Error {
        if (!this.scenesCB.has(scene)) {
            return new Error("Scene " + scene + "does not exist")
        }
        
        Event.trigger(EventType.SCENE_WILL_CHANGE, scene)
        this.scenesCB.get(scene).forEach(cb => {
            cb(this)
        });
        this.currentScene = scene
        return null
    }

    getCurrentSceneName(): string {
        return this.currentScene
    }
}