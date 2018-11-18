var Renderer = function(sceneCanvas, bufferCanvas) {
    this.scene = sceneCanvas;
    this.buffer = bufferCanvas;
    this.snap = null;
}

/**
 * Draw a rectangle
 * @param {int|float} x 
 * @param {int|float*} y 
 * @param {int} w 
 * @param {int} h 
 * @param {string} color 
 */
Renderer.prototype.draw = function(x, y, w, h, color) {
   this.buffer.draw(x, y, w, h, color);
}

/**
 * Draw ImageData element onto engine's canvas
 * @param {ImageData} imgData 
 * @param {int|float} x 
 * @param {int|float} y 
 * @param {int} w 
 * @param {int} h 
 * @param {int|float} dx 
 * @param {int|float} dy 
 */
Renderer.prototype.drawImageData = function(imgData, x, y, w, h, dx, dy) {
    this.buffer.drawImageData(imgData, x, y, w, h, dx, dy);
}
/**
 * Draw Image element onto engine's canvas
 * @param {Image} Image 
 * @param {int|float} x 
 * @param {int|float} y 
 * @param {int} w 
 * @param {int} h 
 */
Renderer.prototype.drawImage = function(image, x, y, w, h) {
    this.buffer.drawImage(image, x, y, w, h);
}

Renderer.prototype.drawLine = function(fX, fY, tX, tY) {
    this.buffer.drawLine(fX, fY, tX, tY);
}

/**
 * Width of the engine's canvas
 * @return int
 */
Renderer.prototype.width = function() {
    return this.scene.width();
}

/**
 * Height of the engine's canvas
 * @return int
 */
Renderer.prototype.height = function() {
    return this.scene.height();
}

/**
 * Return the ImageData version of the whole engine's canvas
 * @return ImageData
 */
Renderer.prototype.captureScene = function() {
    return this.scene.c.getImageData(0, 0, this.scene.width(), this.scene.height());
}

Renderer.prototype.clear = function() {
    this.scene.clear();
    this.buffer.clear();
}

Renderer.prototype.render = function() {
    // this.scene.clear();
    this.scene.drawImageData(
        this.buffer.c.getImageData(
            0, 0, this.buffer.width(), this.buffer.height()
        )
    );
    this.buffer.clear();
}

Renderer.prototype.snapshot = function() {
    return this.buffer.snapshot();
}

module.exports = Renderer;
