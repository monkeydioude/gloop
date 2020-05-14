export enum EventType {
    CLICK = 0,
    SCENE_WILL_CHANGE,
    SCENE_CHANGED
}

interface EventCB {
    <Entity>(entity: Entity): void
}

type Store = {
    [key: number]: EventCB[]
}

var eventStore: Store = {}

function on(eventType: EventType, eventCB: (entity: any) => void): void {
    if (eventStore[eventType] == undefined) {
        eventStore[eventType] = []
    }
    eventStore[eventType].push(eventCB)
}

function trigger<Entity>(eventType: EventType, entity: Entity): void {
    if (eventStore[eventType] == undefined) {
        return
    }
    eventStore[eventType].forEach((eventCb: (entity: any) => void, index: number) => {
        eventCb(entity)
    })
}

export default {
    on: on,
    trigger: trigger,
    EventType: EventType
}