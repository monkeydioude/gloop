var CouldNotLoad = require('../errors/couldNotLoad'),
    Img = require('./img');

var Assets = function() {
    this.assets = [];
    this.stillLoadingIt = 0;
}

/**
 * @param string name
 * @param object data
 * 
 * loadImage starts the asynchronous loading of a single image
 */
Assets.prototype.loadImage = function(name, data) {
    if (!data.hasOwnProperty("src")) {
        return ;
    }
    if (!data.hasOwnProperty("dx")) {
        data.dx = 0;
    }
    if (!data.hasOwnProperty("dy")) {
        data.dy = 0;
    }

    this.assets[name] = new Img(name, data.src, data.dx, data.dy);
    
    this.assetLoadingIt++;
    this.assets[name].onload = function() {
        this.assetLoadingIt--;
    }.bind(this);
}

/**
 * @param Object imgObject
 * @return CouldNotLoad|null
 * 
 * loadImages loads an Object of images using the form:
 * {"asset_name": "path_to_asset"}
 */
Assets.prototype.loadImages = function(imgObject) {
    if (imgObject.constructor !== {}.constructor){
        return new CouldNotLoad("Assets.loadImages: imgObject is not an Object");
    }

    for (var k in imgObject) {
        if (!imgObject.hasOwnProperty(k)) {
            continue;
        }
        this.loadImage(k, imgObject[k]);
    }
    
    return null;
}

/**
 * @return bool
 * 
 * hasFinishLoading returns the state of the assets loading
 */
Assets.prototype.hasFinishedLoading = function() {
    return this.stillLoadingIt === 0;
}

/**
 * @return Asset
 */
Assets.prototype.get = function(name) {
    if (this.assets[name] == undefined) {
        return null;
    }

    return this.assets[name];
}

module.exports = Assets;
