function DataCache(value) {
    this._value = value;
}

DataCache.prototype.setValue = function(value){
    this._value=value;
};

DataCache.prototype.getValue = function(){
    return this._value;
};

module.export = DataCache;
