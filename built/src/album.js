"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
var Album = /** @class */ (function () {
    function Album(artist, name, year) {
        this.artist = artist;
        this.name = name;
        this.year = year;
    }
    Album.loadJson = function (jsonSource) {
        if (jsonSource) {
            var source = JSON.parse(jsonSource);
            return new Album(source.artist, source.name, source.year);
        }
        return undefined;
    };
    Album.loadObj = function (objSource) {
        if (objSource) {
            return new Album(objSource.artist, objSource.name, objSource.year);
        }
        return undefined;
    };
    Album.prototype.equals = function (other) {
        if (!other)
            return false;
        return (this.artist === other.artist && this.name === other.name);
    };
    Album.compare = function (one, other) {
        if (!one && !other)
            return 0;
        if (!one)
            return -1;
        if (!other)
            return 1;
        if (one.artist !== other.artist)
            return one.artist.localeCompare(other.artist);
        if (one.name !== other.name)
            return one.name.localeCompare(other.name);
        return 0;
    };
    Album.compareArray = function (one, other) {
        if (!one && !other)
            return 0;
        if (!one)
            return 1;
        if (!other)
            return -1;
        return other.length - one.length;
    };
    Album.prototype.getString = function () {
        return this.artist + ": " + this.name + " " + this.year;
    };
    Album.prototype.consoleLog = function () {
        console.log(this.getString());
    };
    return Album;
}());
exports.Album = Album;
//# sourceMappingURL=album.js.map