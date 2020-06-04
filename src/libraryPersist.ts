import { Album } from "./album";
import { Library } from "./library";
import { readFileSync, writeFileSync } from 'fs';

export class LibraryPersist{
    fileName: string;

    static albumToStore (item: Album):string{
        if(!item) return null;
        return `${item.artist}|${item.name}|${item.year}}`;
    }

    static albumFromStore (item: string): Album{
        if(!item) return null;
        const elements = item.split('|');
        return new Album(elements[0], elements[1], elements[2]);
    }

    static dataStringFromStringArray(dataArray: Array<string>): string{
        if(dataArray){
            return dataArray.reduce((accumulator, currentValue) => `${accumulator}\r\n${currentValue}`, "");
        }
        return "";
    }

    static stringArrayFromData (data: string):Array<string>{
        if(!data) return new Array<string>();
        return data.split('\r\n');
    }

    static stringArrayFromAlbumArray(albumArray: Array<Album>): Array<string>{
        if(albumArray){
            let retVal = new Array<string>();
            albumArray.forEach(item => retVal.push(`${item.artist}|${item.name}|${item.year}`));
            return retVal;
        }
        return new Array<string>();
    }

    static albumArrayFromData (data: string):Array<Album>{
        if(!data) return new Array<Album>();
        const stringArray = this.stringArrayFromData(data);
        if(!stringArray || stringArray.length === 0) return new Array<Album>();
        let retVal = new Array<Album>();
        stringArray.forEach(item => {
            retVal.push(this.albumFromStore(item));
        });
        return retVal;
    }

    static stringArrayFromLibrary(library: Library):Array<string>{
        if(library && library.albumList){
            return this.stringArrayFromAlbumArray(library.albumList);
        }
    }

    static libraryFromData(data: string): Library{
        const albumArray = this.albumArrayFromData(data);
        if(!albumArray) return new Library(new Array<Album>());
        return new Library(albumArray);
    }

    static dataFromLibrary(library: Library): string{
        if(library){
            const stringArray = this.stringArrayFromLibrary(library);
            return this.dataStringFromStringArray(stringArray);
        }
    }

    static libraryFromFile(fileName: string): Library{
        if(!fileName) return new Library(new Array<Album>());
        
        const albumData = readFileSync(fileName).toString();
        return this.libraryFromData(albumData);
    }

    static fileFromLibrary(fileName: string, library: Library): string{
        if(!fileName) return "failed";

        const albumData = this.dataFromLibrary(library);
        writeFileSync(fileName, albumData);
        return "success";
    }
}