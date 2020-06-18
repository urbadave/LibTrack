import { Album } from "./album";
import { Library } from "./library";
import { LibraryPersist } from "./libraryPersist";
import { readFileSync, writeFileSync } from 'fs';

let testLibrary = LibraryPersist.libraryFromFile('./albums.txt');

const stringData = LibraryPersist.dataFromLibrary(testLibrary);

//console.log(stringData);

const result = LibraryPersist.fileFromLibrary('./albumsOut.txt', testLibrary);
const randomList = testLibrary.randomArray(testLibrary.albumList);
console.log(randomList.length);
const prettyData = testLibrary.prettyData(randomList);


writeFileSync('./albumsPretty.txt', prettyData);

console.log(result);
