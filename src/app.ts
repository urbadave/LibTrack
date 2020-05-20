import { Album } from "./album";
import { Library } from "./library";
import { readFileSync } from 'fs';

const fileData = readFileSync('./practiceData.js').toString();
//console.log(fileData);
let albumInfo = JSON.parse(fileData);

let sourceList = [];
albumInfo.forEach(item => sourceList.push(Album.loadJson(JSON.stringify(item))));

let testLibrary = new Library(sourceList);
//testLibrary.selected.consoleLog();

console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log("");
testLibrary.setCurrentPage(29);
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
testLibrary.setSelectedAlbum(288);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
console.log(`Selected album -- ${testLibrary.selected.getString()}`);
console.log('');
const albumToAdd = new Album('Electric Light Orchestra', 'Out Of The Blue');
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