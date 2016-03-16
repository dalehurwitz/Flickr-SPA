import qwest from "qwest";

qwest.setDefaultOptions({
    cache: true,
	responseType: "json"
});

const flickrApi = {
	baseUrl: "https://api.flickr.com/services/rest/",
	
	getPhotos: function(params) {
		return qwest.get(this.baseUrl, params);
	},
	
	constructImgUrl: function(photo) {
		
	}
}

export default flickrApi;