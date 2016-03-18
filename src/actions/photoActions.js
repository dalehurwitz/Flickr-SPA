import alt from "../alt";

class PhotoActions {
	getPhotosByTag(tags) {
		let dispatcher = this;
		let arr = ["a", "e", "i", "o", "u"];
		setTimeout(function() {
			dispatcher.dispatch(arr);
		}, 3000);
	}
}

export alt.createActions(PhotoActions);
