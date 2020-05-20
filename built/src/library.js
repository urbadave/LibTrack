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
