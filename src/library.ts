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
            if(this.count > 0)
                this.selected = this.albumList[0];
        }
        this.numberOfPages = Math.round(this.albumList.length / this.currentPageSize);
        this.currentPage = 1;
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

    setCurrentPage(pageNumber: number){
        if(pageNumber > this.numberOfPages){
            this.currentPage = this.numberOfPages;
        } else {
            this.currentPage = pageNumber;
        }
        this.selected = this.albumList[(this.currentPage - 1) * this.currentPageSize];
    }

    setPageSize(sizeIndex: number){
        this.currentPageSize = this.pageSizes[sizeIndex];
    }

    addAlbum(newAlbum: Album){
        if(this.albumIndex(newAlbum) === -1){
            this.albumList.push(newAlbum);
            this.sortAlbums();
            const index = this.albumIndex(newAlbum);
            this.selected = this.albumList[index];
        }
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