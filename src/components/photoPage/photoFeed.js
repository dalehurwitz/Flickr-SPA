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

		this._generatePhotos = this._generatePhotos.bind(this);
	}

	_generatePhotos() {
		return this.props.photos.map(function(data, val) {
			return <Photo key={data.id} photoData={data} />;
		});
	}

	componentWillMount() {
		var tag = this.props.defaultTag;
		var self = this;
	}

	render() {
		return (
			<div className="feed">
				{this._generatePhotos()}
			</div>
		)
	}
}

export default PhotoFeed;
