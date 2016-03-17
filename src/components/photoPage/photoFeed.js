"use strict";

import React from "react";

import Photo from "./photo";
import flickrApi from "../../api/flickrApi";

class PhotoFeed extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			photos: []
		}

		this.generatePhotos = this.generatePhotos.bind(this);
	}

	generatePhotos() {
		return this.state.photos.map(function(data, val) {
			return <Photo key={val} photoData={data} />;
		});
	}

	componentWillMount() {
		var tag = this.props.defaultTag;
		var self = this;
		flickrApi.getPhotosByTag(tag).then(function(data) {
			self.setState({ photos: data.response.photos.photo });
		});

	}

	render() {
		return (
			<div className="feed">
				{this.generatePhotos()}
			</div>
		)
	}
}

export default PhotoFeed;
