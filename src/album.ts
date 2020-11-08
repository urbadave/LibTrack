export class Album {
    artist: string;
    name: string;
    year: string;

    constructor(artist: string, name: string, year?: string){
        this.artist = artist;
        this.name = name;
        this.year = year;
    }

    static loadJson(jsonSource: string){
        if(jsonSource){
            const source = JSON.parse(jsonSource);
            return new Album(source.artist, source.name, source.year);
        }
        return undefined;
    }

    static loadObj(objSource: Album){
        if(objSource){
            return new Album(objSource.artist, objSource.name, objSource.year);
        }
        return undefined;
    }

    equals(other: Album){
        if(!other) return false;

        return (this.artist === other.artist && this.name === other.name);
    }

    static compare(one: Album, other: Album){
        if(!one && !other) return 0;
        if(!one) return -1;
        if(!other) return 1;

        if(one.artist !== other.artist) return one.artist.localeCompare(other.artist);

        if(one.name !== other.name) return one.name.localeCompare(other.name);

        return 0;
    }

    static compareArray(one: Array<Album>, other: Array<Album>){
        if(!one && !other) return 0;
        if(!one) return 1;
        if(!other) return -1;

        return other.length - one.length;
    }

    getString(){
        return `${this.artist}: ${this.name} ${this.year}`;
    }

    consoleLog(){
        console.log(this.getString());
    }
}