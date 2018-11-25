import {Img} from "./img"
import {Frameset} from "./frameset"
import {CouldNotLoad} from '../errors/couldNotLoad'
import {Error} from '../errors/error'
import {Asset} from "./asset"

export class Loader {
    assets: {[name: string]: Asset} = {}
    stillLoadingIt: number = 0
    loadedCb: any = []

    constructor(public basePath: string) {}

    loadFrameset(name: string, data: any, frameset: any, cb: any) {
        this.loadImage(name, data, (img: any) => {
            var fs = new Frameset(name, frameset, img);
            this.assets[name] = fs;
            cb(fs)
        })
    }

    /**
     * @param string name
     * @param object data
     * @param function cb
     * 
     * loadImage starts the asynchronous loading of a single image
     */
    loadImage = function(name: string, data: any, cb: any) {
        this.assets[name] = new Img(name, data);
        
        this.assetLoadingIt++;
        this.assets[name].loadWithCallback(() => {
            if (cb !== undefined) {
                cb(this.assets[name]);
            }
            this.assetLoadingIt--;
            if (this.hasFinishedLoading) {
                this.triggerOnLoaded()
            }
        });
    }

    /**
     * @param Object assetObject
     * @param function cb
     * @return CouldNotLoad|null
     * 
     * loadImages loads an Object of images using the form:
     * {"asset_name": "path_to_asset"}
     */
    load(assetObject: any, cb: any): Error {
        if (assetObject.constructor !== {}.constructor){
            return new CouldNotLoad("Assets.loadImages: assetObject is not an Object")
        }

        for (var k in assetObject) {
            if (!assetObject.hasOwnProperty(k)) {
                continue;
            }
            switch (assetObject[k].type) {
                case 'image':
                    this.loadImage(k, assetObject[k].data, cb);
                break;
                case 'frameset':
                    this.loadFrameset(k, assetObject[k].data, assetObject[k].frames, cb);
                break;
                default:
                    console.log("Dunno how to load this Mista")
            }
        }
        
        return null;
    }

    /**
     * @returns {boolean}
     * 
     * hasFinishLoading returns the state of the assets loading
     */
    hasFinishedLoading(): boolean {
        return this.stillLoadingIt === 0;
    }

    
    /**
     * @returns Asset
     */
    get(name: string) {
        if (this.assets[name] == undefined) {
            return null;
        }

        return this.assets[name];
    }

    onLoaded(cb: any): void {
        this.loadedCb.push(cb);
    }

    triggerOnLoaded() {
        for (let i = 0; i < this.loadedCb.length; i++) {
            this.loadedCb[i](this.assets);
        }
        this.loadedCb = [];
    }
}