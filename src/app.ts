import { Album } from "./album";
import { Library } from "./library";
import { LibraryPersist } from "./libraryPersist";
import { readFileSync, writeFileSync } from 'fs';

let testLibrary = LibraryPersist.libraryFromFile('./albums.txt');

// let albumList = testLibrary.albumList;
// let artistArrays = testLibrary.artistArrays(albumList);
// let nullArray = testLibrary.randomArray2(albumList);

const stringData = LibraryPersist.dataFromLibrary(testLibrary);

//console.log(stringData);

const result = LibraryPersist.fileFromLibrary('./albumsOut.txt', testLibrary);
const randomList = testLibrary.randomArray2(testLibrary.albumList);
//const randomList = testLibrary.randomArray(testLibrary.albumList);
console.log(randomList.length);
const prettyData = testLibrary.prettyData(randomList);


writeFileSync('./albumsPretty.txt', prettyData);

console.log(result);
