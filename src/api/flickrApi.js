import qwest from "qwest";

qwest.setDefaultOptions({
    cache: true,
	responseType: "json"
});

const extend = (obj, src) => {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

const defaultParams = {
	method: "flickr.photos.search",
	api_key: "07c3a7b577228b8065500294db6d2416",
	format: "json",
	nojsoncallback: 1,
	per_page: 20
}

const flickrApi = {
	baseUrl: "https://api.flickr.com/services/rest/",
	
	getPhotos(params) {
		params = params || {};
		params = extend(params, defaultParams);
		return qwest.get(this.baseUrl, params);
	},

	constructImgUrl(photo, size) {
		size = /^[sqtmn\-zcbhko]$/.test(size) ? `_${size}` : ""; //Ensure size matches one of the applicable flickr size suffixes - https://www.flickr.com/services/api/misc.urls.html
		return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${size}.jpg`;
	}

}

export default flickrApi;
