var Img = function(name, src, dX, dY) {
    if (name === undefined) {
        console.error("An Image requires a name");
    }
    if (src === undefined) {
        console.error("An Image requires a source");
    }
    if (dX === undefined) {
        dX = 0;
    }
    if (dY === undefined) {
        dY = 0;
    }

    this.name = name;
    this.src = src;
    this.dX = dX;
    this.dY = dY;
    this.asset = new Image()
    this.asset.src = src;
    this.asset.crossOrigin = "Anonymous";
}

Img.prototype.getDecalX = function() {
    return this.dX;
}

Img.prototype.getDecalY = function() {
    return this.dY;
}

Img.prototype.getDecal = function() {
    return {
        x: this.getDecalX(),
        y: this.getDecalY()
    }
}

Img.prototype.getAsset = function() {
    return this.asset;
}

module.exports = Img;
