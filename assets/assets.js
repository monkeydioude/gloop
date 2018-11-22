var CouldNotLoad = require('../errors/couldNotLoad'),
    Img = require('./img'),
    Frameset = require('./frameset');

var Assets = function(basePath) {
    this.assets = [];
    this.stillLoadingIt = 0;
    this.basePath = basePath;
    this.loadedCb = [];
}

Assets.prototype.loadFrameset = function(name, data, frameset, cb) {
    var img = new Img(name, data);

    img.loadWithCallback(
        function (img) {
            var fs = new Frameset(name, frameset, img);
            this.assets[data.name] = fs;
            cb(fs)
        }.bind(this)
    )
}

/**
 * @param string name
 * @param object data
 * @param function cb
 * 
 * loadImage starts the asynchronous loading of a single image
 */
Assets.prototype.loadImage = function(name, data, cb) {
    this.assets[name] = new Img(name, data);
    
    this.assetLoadingIt++;
    this.assets[name].loadWithCallback(function() {
        if (cb !== undefined) {
            cb(this.assets[name]);
        }
        this.assetLoadingIt--;
        if (this.hasFinishedLoading) {
            this.triggerOnLoaded()
        }
    }.bind(this));
}

/**
 * @param Object assetObject
 * @param function cb
 * @return CouldNotLoad|null
 * 
 * loadImages loads an Object of images using the form:
 * {"asset_name": "path_to_asset"}
 */
Assets.prototype.load = function(assetObject, cb) {
    if (assetObject.constructor !== {}.constructor){
        return new CouldNotLoad("Assets.loadImages: assetObject is not an Object");
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
            default:
                console.log("Dunno how to load this Mista")
        }
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

Assets.prototype.onLoaded = function(cb) {
    this.loadedCb.push(cb);
}

Assets.prototype.triggerOnLoaded = function() {
    for (i = 0; i < this.loadedCb.length; i++) {
        this.loadedCb[i](this.assets);
    }
    this.loadedCb = [];
}

module.exports = Assets;
