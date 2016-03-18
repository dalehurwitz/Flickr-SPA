import PhotoActions from "../actions/photoActions";

class PhotoStore {
	constructor() {
		this.bindActions(PhotoActions);

		this.photos = [];
	}

	onGetPhotosByTag(photos) {
		this.photos = photos;
	}
}
