import { practice } from "./practiceData";
import { Album } from "./album";
import { Library } from "./library";


let p1 = practice[0];
let sourceList = [];
practice.forEach(item => sourceList.push(Album.loadJson(JSON.stringify(item))));

let testLibrary = new Library(sourceList);
testLibrary.sortAlbums();
testLibrary.selected.consoleLog();
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
let page = testLibrary.getCurrentPage();
page.forEach(item => item.consoleLog());

testLibrary.setCurrentPage(29);
console.log(`Page ${testLibrary.currentPage} of ${testLibrary.numberOfPages}`);
page = testLibrary.getCurrentPage();
page.forEach(item => item.consoleLog());

