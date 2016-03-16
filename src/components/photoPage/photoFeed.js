"use strict";

import React from "react";

import Photo from "./photo";

class PhotoFeed extends React.Component {

	generatePhotos() {
		return [1, 2, 3, 4, 5].map(function(key) {
			return <Photo key={key} />;
		});
	}

	render() {
		return (
			<div>
				This is the photo Feed
				{this.generatePhotos()}
			</div>
		)
	}
}

export default PhotoFeed;
