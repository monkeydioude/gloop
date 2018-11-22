var Img = function(name, data) {
    if (name === undefined) {
        console.error("An Image requires a name");
    }
    if (data.src === undefined) {
        console.error("An Image requires a source");
    }
    if (!data.hasOwnProperty("src")) {
        return ;
    }
    if (!data.hasOwnProperty("dx")) {
        data.dx = 0;
    }
    if (!data.hasOwnProperty("dy")) {
        data.dy = 0;
    }
    if (data.dx === undefined) {
        data.dx = 0;
    }
    if (data.dy === undefined) {
        data.dy = 0;
    }
    if (data.w === undefined) {
        data.w = 64;
    }
    if (data.h === undefined) {
        data.h = 64;
    }
    this.name = name;
    this.src = data.src;
    this.dx = data.dx;
    this.dy = data.dy;
    this.w = data.w;
    this.h = data.h;
    this.asset = new Image()
    this.asset.src = data.src;
    this.asset.crossOrigin = "Anonymous";
}

Img.prototype.getDecalX = function() {
    return this.dx;
}

Img.prototype.getDecalY = function() {
    return this.dy;
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

Img.prototype.loadWithCallback = function(cb) {
    this.asset.onload = cb;
}

module.exports = Img;
