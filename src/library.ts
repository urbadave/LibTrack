import { Album } from "./album";

export class Library{
    albumList: Array<Album>;
    selected: Album;
    pageSizes: Array<number>;
    currentPageSize: number;
    numberOfPages: number;
    currentPage: number;

    constructor(list: Array<Album>){
        this.pageSizes = [5, 10, 20, 50, 100];
        this.currentPageSize = 10;
        this.albumList = [];
        if(list){
            list.forEach(item => this.albumList.push(Album.loadObj(item)));
        }
        this.sortAlbums();
        this.numberOfPages = Math.round(this.albumList.length / this.currentPageSize);
        this.setSelectedAlbum(0);
    }

    getCurrentPage(){
        const initialIndex = (this.currentPage - 1) * this.currentPageSize;
        let finalIndex = initialIndex + this.currentPageSize;
        if(finalIndex <= this.albumList.length -1){
            return this.albumList.slice(initialIndex, finalIndex);
        } else {
            return this.albumList.slice(initialIndex);
        }
    }

    setCurrentPage(pageNumber: number, index?: number){
        if(pageNumber > this.numberOfPages){
            this.currentPage = this.numberOfPages;
        } else {
            this.currentPage = pageNumber;
        }
        if(!index)
            this.selected = this.albumList[(this.currentPage - 1) * this.currentPageSize];
        else
            this.selected = this.albumList[index];
    }

    setPageSize(sizeIndex: number){
        this.currentPageSize = this.pageSizes[sizeIndex];
    }

    addAlbum(newAlbum: Album){
        if(this.albumIndex(newAlbum) === -1){
            this.albumList.push(newAlbum);
            this.sortAlbums();
            const index = this.albumIndex(newAlbum);
            this.setSelectedAlbum(index);
        }
    }

    editSelectedAlbum(newArtist: string, newName: string){
        if(this.selected){
            this.selected.artist = newArtist;
            this.selected.name = newName;
            this.sortAlbums();
            const index = this.albumIndex(this.selected);
            this.setSelectedAlbum(index);
        }
    }

    deleteSelectedAlbum(){
        if(this.selected){
            const index = this.albumIndex(this.selected);
            const newIndex = (index === 0) ? 0 : index-1;
            this.albumList.splice(index, 1);
            if(this.albumList.length > 0){
                this.setSelectedAlbum(newIndex);
            } else {
                this.selected = null;
            }
        }
    }

    findPageForIndex(index: number){
        return Math.floor(index/this.currentPageSize + 1);
    }

    setSelectedAlbum(index: number){
        const pageOfAlbum = this.findPageForIndex(index);
        this.setCurrentPage(pageOfAlbum, index);
    }

    sortAlbums(){
        this.albumList.sort(Album.compare);
    }

    albumIndex(anAlbum: Album): number{
        if(!this.albumList || this.albumList.length === 0){
            return -1;
        }

        //get all matching albums
        const filtered = this.albumList.filter(item => item.equals(anAlbum));
        //if there's any matching albums, then return index of first.
        if(filtered.length > 0){
            return this.albumList.indexOf(filtered[0]);
        }
        
        return -1;
    }

    get count(){
        return this.albumList.length;
    }
}