"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var libraryPersist_1 = require("./libraryPersist");
var fs_1 = require("fs");
var testLibrary = libraryPersist_1.LibraryPersist.libraryFromFile('./albums.txt');
// let albumList = testLibrary.albumList;
// let artistArrays = testLibrary.artistArrays(albumList);
// let nullArray = testLibrary.randomArray2(albumList);
var stringData = libraryPersist_1.LibraryPersist.dataFromLibrary(testLibrary);
//console.log(stringData);
var result = libraryPersist_1.LibraryPersist.fileFromLibrary('./albumsOut.txt', testLibrary);
var randomList = testLibrary.randomArray2(testLibrary.albumList);
//const randomList = testLibrary.randomArray(testLibrary.albumList);
console.log(randomList.length);
var prettyData = testLibrary.prettyData(randomList);
fs_1.writeFileSync('./albumsPretty.txt', prettyData);
console.log(result);
//# sourceMappingURL=app.js.map