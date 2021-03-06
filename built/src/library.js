"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var album_1 = require("./album");
var Library = /** @class */ (function () {
    function Library(list) {
        var _this = this;
        this.pageSizes = [5, 10, 20, 50, 100];
        this.currentPageSize = 10;
        this.albumList = [];
        if (list) {
            list.forEach(function (item) { return _this.albumList.push(album_1.Album.loadObj(item)); });
        }
        this.sortAlbums();
        this.numberOfPages = Math.round(this.albumList.length / this.currentPageSize);
        this.setSelectedAlbum(0);
    }
    Library.prototype.getCurrentPage = function () {
        var initialIndex = (this.currentPage - 1) * this.currentPageSize;
        var finalIndex = initialIndex + this.currentPageSize;
        if (finalIndex <= this.albumList.length - 1) {
            return this.albumList.slice(initialIndex, finalIndex);
        }
        else {
            return this.albumList.slice(initialIndex);
        }
    };
    Library.prototype.setCurrentPage = function (pageNumber, index) {
        if (pageNumber > this.numberOfPages) {
            this.currentPage = this.numberOfPages;
        }
        else {
            this.currentPage = pageNumber;
        }
        if (!index)
            this.selected = this.albumList[(this.currentPage - 1) * this.currentPageSize];
        else
            this.selected = this.albumList[index];
    };
    Library.prototype.setPageSize = function (sizeIndex) {
        this.currentPageSize = this.pageSizes[sizeIndex];
    };
    Library.prototype.addAlbum = function (newAlbum) {
        if (this.albumIndex(newAlbum) === -1) {
            this.albumList.push(newAlbum);
            this.sortAlbums();
            var index = this.albumIndex(newAlbum);
            this.setSelectedAlbum(index);
        }
    };
    Library.prototype.editSelectedAlbum = function (newArtist, newName) {
        if (this.selected) {
            this.selected.artist = newArtist;
            this.selected.name = newName;
            this.sortAlbums();
            var index = this.albumIndex(this.selected);
            this.setSelectedAlbum(index);
        }
    };
    Library.prototype.deleteSelectedAlbum = function () {
        if (this.selected) {
            var index = this.albumIndex(this.selected);
            var newIndex = (index === 0) ? 0 : index - 1;
            this.albumList.splice(index, 1);
            if (this.albumList.length > 0) {
                this.setSelectedAlbum(newIndex);
            }
            else {
                this.selected = null;
            }
        }
    };
    Library.prototype.findPageForIndex = function (index) {
        return Math.floor(index / this.currentPageSize + 1);
    };
    Library.prototype.setSelectedAlbum = function (index) {
        var pageOfAlbum = this.findPageForIndex(index);
        this.setCurrentPage(pageOfAlbum, index);
    };
    Library.prototype.sortAlbums = function () {
        this.albumList.sort(album_1.Album.compare);
    };
    Library.prototype.randomArray = function (albumListIn) {
        var albumList = new Array();
        albumListIn.forEach(function (item) { return albumList.push(item); });
        var albumListLength = albumList.length;
        var randomList = new Array();
        var index = 0;
        for (var i = 0; i < albumListLength; i++) {
            if (albumList.length > 1) {
                index = this.getRandomInt(0, albumList.length);
                randomList.push(albumList[index]);
                albumList.splice(index, 1);
            }
            else {
                randomList.push(albumList[0]);
            }
        }
        return randomList;
    };
    Library.prototype.randomArray2 = function (albumListIn) {
        var randomList = new Array();
        albumListIn.forEach(function (a) { return randomList.push(null); });
        var artistList = this.artistArrays(albumListIn);
        for (var i = 0; i < artistList.length; i++) {
            var artistSubList = artistList[i];
            var indexList = this.indexList(randomList);
            console.log(indexList.length);
            var subSize = Math.floor(indexList.length / artistSubList.length);
            var base = 0;
            var max = subSize;
            for (var j = 0; j < artistSubList.length; j++) {
                var randomIndex = indexList[this.getRandomInt(base, max)];
                console.log(randomIndex);
                randomList[randomIndex] = artistSubList[j];
                base = base + subSize;
                max = max + subSize;
            }
        }
        return randomList;
    };
    Library.prototype.indexList = function (albumListIn) {
        var retVal = new Array();
        for (var i = 0; i < albumListIn.length; i++) {
            if (albumListIn[i] === null)
                retVal.push(i);
        }
        return retVal;
    };
    Library.prototype.artistArrays = function (albumListIn) {
        var artistArrays = new Array();
        var sortedIn = albumListIn.sort(album_1.Album.compare);
        var currentArtist = sortedIn[0].artist;
        var currentArray = new Array();
        for (var i = 0; i < sortedIn.length; i++) {
            if (sortedIn[i].artist === currentArtist) {
                currentArray.push(sortedIn[i]);
            }
            else {
                artistArrays.push(currentArray);
                currentArray = new Array();
                currentArtist = sortedIn[i].artist;
                currentArray.push(sortedIn[i]);
            }
        }
        artistArrays.push(currentArray);
        artistArrays.sort(album_1.Album.compareArray);
        return artistArrays;
    };
    Library.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    Library.prototype.prettyData = function (albumList) {
        var longestArtist = 0;
        var longestName = 0;
        albumList.forEach(function (item) {
            if (item.artist.length > longestArtist)
                longestArtist = item.artist.length;
            if (item.name.length > longestName)
                longestName = item.name.length;
        });
        var outputArray = [];
        albumList.forEach(function (item) {
            var artist = item.artist.padEnd(longestArtist, " ");
            var name = item.name.padEnd(longestName, " ");
            outputArray.push(artist + " " + name + " " + item.year);
        });
        var outputString = outputArray.reduce(function (accumulator, currentValue) { return accumulator + "\r\n" + currentValue; }, "");
        return outputString;
    };
    Library.prototype.albumIndex = function (anAlbum) {
        if (!this.albumList || this.albumList.length === 0) {
            return -1;
        }
        //get all matching albums
        var filtered = this.albumList.filter(function (item) { return item.equals(anAlbum); });
        //if there's any matching albums, then return index of first.
        if (filtered.length > 0) {
            return this.albumList.indexOf(filtered[0]);
        }
        return -1;
    };
    Object.defineProperty(Library.prototype, "count", {
        get: function () {
            return this.albumList.length;
        },
        enumerable: false,
        configurable: true
    });
    return Library;
}());
exports.Library = Library;
//# sourceMappingURL=library.js.map