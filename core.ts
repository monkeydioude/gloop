import { DisplayUpdater } from "./updater/displayUpdater";
import { Updater } from "./updater/updater";
import { Loader } from "./assets/loader";

export interface Core {
    getDisplayUpdater(): DisplayUpdater
    getDataUpdater(): Updater
    getAssetsLoader(): Loader
}