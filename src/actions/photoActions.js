import alt from "../alt";
import flickrApi from "../api/flickrApi";

class PhotoActions {
	getPhotosByTag(tags) {
		var arr = ["a", "e", "i", "o", "u"];
        var self = this;
        return (dispatch) => {
            dispatch();
            flickrApi.getPhotosByTag(tags).then(this.updatePhotos);
        }
	}
    
    updatePhotos(data) {
        return data.response.photos.photo;
    }
}

export default alt.createActions(PhotoActions);
