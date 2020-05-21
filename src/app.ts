import { Album } from "./album";
import { Library } from "./library";
import { readFileSync } from 'fs';

const albumData = readFileSync('./albums.txt').toString();
const albumArray = albumData.split('\r\n');

let sourceList = [];
albumArray.forEach(item => {
    const data = item.split('|');
    sourceList.push(new Album(data[0], data[1], data[2]));
});
// albumInfo.forEach(item => sourceList.push(Album.loadJson(JSON.stringify(item))));

let testLibrary = new Library(sourceList);
//testLibrary.selected.consoleLog();

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