import alt from "../alt";
import flickrApi from "../api/flickrApi";

class PhotoActions {
	getPhotos(params, page) {
        if(page) params.page = page;
        flickrApi.getPhotos(params).then(this.updatePhotos.bind(this));
        return false;
	}
    
    getPhotosByTags(tags, page) {
        this.getPhotos({ tags: tags }, page);
        return tags;
    }
    
    updatePhotos(data) {
        return data.response.photos;
    }    
}

export default alt.createActions(PhotoActions);
