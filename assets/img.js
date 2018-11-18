var Img = function(name, src, dX, dY, w, h) {
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
    if (w === undefined) {
        w = 64;
    }
    if (h === undefined) {
        h = 64;
    }
    this.name = name;
    this.src = src;
    this.dX = dX;
    this.dY = dY;
    this.w = w;
    this.h = h;
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

Img.prototype.render = function (renderer, x, y) {
    renderer.drawImage(this.getAsset(), x + this.getDecalX(), y + this.getDecalY(), this.w, this.h);
}

module.exports = Img;
