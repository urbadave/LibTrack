"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var album_1 = require("./album");
var library_1 = require("./library");
var fs_1 = require("fs");
var albumData = fs_1.readFileSync('./albums.txt').toString();
var albumArray = albumData.split('\r\n');
var sourceList = [];
albumArray.forEach(function (item) {
    var data = item.split('|');
    sourceList.push(new album_1.Album(data[0], data[1], data[2]));
});
// albumInfo.forEach(item => sourceList.push(Album.loadJson(JSON.stringify(item))));
var testLibrary = new library_1.Library(sourceList);
//testLibrary.selected.consoleLog();
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log("");
testLibrary.setCurrentPage(30);
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
testLibrary.setSelectedAlbum(12);
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
testLibrary.setSelectedAlbum(49);
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
testLibrary.setSelectedAlbum(294);
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
var albumToAdd = new album_1.Album('Electric Light Orchestra', 'Out Of The Blue', '1977');
testLibrary.addAlbum(albumToAdd);
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
testLibrary.editSelectedAlbum('The Electric Light Orchestra', 'Out of the Blue');
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
testLibrary.deleteSelectedAlbum();
console.log("Page " + testLibrary.currentPage + " of " + testLibrary.numberOfPages);
console.log("Selected album -- " + testLibrary.selected.getString());
console.log('');
