import { practice } from "./practiceData";
import { Album } from "./album";
import { Library } from "./library";


let p1 = practice[0];
let sourceList = [];
practice.forEach(item => sourceList.push(Album.loadJson(JSON.stringify(item))));

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
