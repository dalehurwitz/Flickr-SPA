import alt from "../alt";
import PhotoActions from "../actions/photoActions";

class PhotoStore {
	constructor() {
        this.photos = [];
        this.loadingPhotos = false;
        this.defaultPhotoTags = "coffee";
        this.currentPhotoTags = this.defaultPhotoTags;
        this.currentResultsPage = 1;
        
        this.bindListeners({
            getPhotos: PhotoActions.GET_PHOTOS,
            getPhotosByTags: PhotoActions.GET_PHOTOS_BY_TAGS,
            onGetPhotos: PhotoActions.UPDATE_PHOTOS
        });
	}
    
    getPhotos() {
        this.loadingPhotos = true;
    }
    
    getPhotosByTags(tags) {
        this.currentPhotoTags = tags;
    }

	onGetPhotos(response) {
        var previousResultsPage = this.currentResultsPage;
        this.currentResultsPage = this.currentResultsPage = response.page;
        
        //Let's use this check to determine if we've loaded more photos or are conducting a new search
        if(this.currentResultsPage > previousResultsPage) {
            this.photos = this.photos.concat(response.photo);
        } else {
            this.photos = response.photo;
        }
        
        this.numResultsPages = response.pages;
        this.loadingPhotos = false;
	}
}

export default alt.createStore(PhotoStore, "PhotoStore");