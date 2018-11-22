var Frameset = function(name, frames, sprite) {
    if (name === undefined) {
        console.error("A Frameset requires a name");
    }
    if (frames === undefined) {
        console.error("A Frameset requires frames");
    }
    if (sprite === undefined) {
        console.error("A Frameset requires a sprite (et ca redemarre)");
    }
    this.name = name;
    this.frames = frames;
    this.sprite = sprite;
}

Frameset.prototype.getNext = function () {

}

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

module.exports = Frameset;
