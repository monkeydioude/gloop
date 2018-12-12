export class Updater {
    nodes: any = {}
    defaultNameCounter: number = 0

    // update runs through the update nodes and call them passing
    // an amount of ms and an entity to the callback
    update(mode: string, T: number, entity?: any): number {
        if (!this.nodes.hasOwnProperty(mode)) {
            return 
        }
        var n = this.nodes[mode],
            updIt = 0,
            updSt = 0

        for (var i in n) {
            updSt = n[i](T, entity)
            if (updSt === undefined) {
                updSt = 1
            }
            if (updSt == -1) {
                delete n[i]
                continue
            }
            updIt += updSt
        }
        
        return updIt
    }
    // add adds a callback to the update list after checking if one already exist
    // for a given mode and maybe a name
    add(mode: string, cb: (T: number, entity: any) => void, name?: string): string {
        if (!name) {
            name = this.defaultNameCounter.toString()
            this.defaultNameCounter++
        }

        if (!this.nodes.hasOwnProperty(mode)) {
            this.nodes[mode] = {}
        }

        if (this.nodes[mode].hasOwnProperty(name)) {
            return "Could not add element to the updater list, name already exists"
        }

        this.nodes[mode][name] = cb

        return null
    }

    // remove removes an updater from the list using
    // a mode and name
    remove(mode: string, name: string): string {
        if (!this.nodes.hasOwnProperty(mode)) {
            return "Could not remove element, mode " + mode + " does not exist"
        }

        if (!this.nodes[mode].hasOwnProperty(name)) {
            return "Could not remove element, name " + name + " does not exist"
        }

        delete this.nodes[mode][name]

        return null
    }

}
