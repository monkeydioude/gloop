var CouldNotLoad = function(msg) {
    this.msg = msg;
}

CouldNotLoad.prototype.error = function() {
    return "Could not Load: " + this.msg;
}

module.exports = CouldNotLoad;