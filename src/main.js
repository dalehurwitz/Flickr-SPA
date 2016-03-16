import React from "react";
import { render } from "react-dom";
//import App from "./components/app";
import Routes from "./routes";

render(Routes, document.getElementById('app'));

import flickrApi from "./api/flickrApi";

var test = flickrApi.getPhotos({
	method: "flickr.photos.search",
	api_key: "07c3a7b577228b8065500294db6d2416",
	tags: "coffee",
	format: "json",
	nojsoncallback: 1
});

test.then(function(data) {
	console.log(data.response.photos.photo[0]);
});