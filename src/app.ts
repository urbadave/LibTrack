import { Album } from "./album";
import { Library } from "./library";
import { LibraryPersist } from "./libraryPersist";
import { readFileSync } from 'fs';

const albumData = readFileSync('./albums.txt').toString();

let testLibrary = LibraryPersist.libraryFromData(albumData);


console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log("");
testLibrary.setCurrentPage(30);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('');
testLibrary.setSelectedAlbum(12);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('')
testLibrary.setSelectedAlbum(49);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('')
testLibrary.setSelectedAlbum(294);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('');
const albumToAdd = new Album('Electric Light Orchestra', 'Out Of The Blue', '1977');
testLibrary.addAlbum(albumToAdd);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('');
testLibrary.editSelectedAlbum('The Electric Light Orchestra', 'Out of the Blue');
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('');
testLibrary.deleteSelectedAlbum();
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('');