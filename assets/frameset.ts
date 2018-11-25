import {Img} from "./img"

export class Frameset {
    constructor(public name: string, public frames: any, public sprite: Img) {}
}

// Frameset.prototype.getNext = function () {

// }

// Img.prototype.getDecalX = function() {
//     return this.dX;
// }

// Img.prototype.getDecalY = function() {
//     return this.dY;
// }

// Img.prototype.getDecal = function() {
//     return {
//         x: this.getDecalX(),
//         y: this.getDecalY()
//     }
// }

// Img.prototype.getAsset = function() {
//     return this.asset;
// }

// Img.prototype.render = function (renderer, x, y) {
//     renderer.drawImage(this.getAsset(), x + this.getDecalX(), y + this.getDecalY(), this.w, this.h);
// }
