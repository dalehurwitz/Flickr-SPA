import alt from "../alt";
import PhotoActions from "../actions/photoActions";

class PhotoStore {
	constructor() {
        this.photos = [];
        this.loadingPhotos = false;
        this.defaultPhotoTag = "coffee";
        
        this.bindListeners({
            getPhotos: PhotoActions.GET_PHOTOS_BY_TAG,
            onGetPhotosByTag: PhotoActions.UPDATE_PHOTOS
        });
	}
    
    getPhotos() {
        this.loadingPhotos = true;
    }

	onGetPhotosByTag(photos) {
		this.photos = photos;
        this.loadingPhotos = false;
	}
}

export default alt.createStore(PhotoStore, "PhotoStore");