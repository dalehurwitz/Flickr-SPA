"use strict";

import React from "react";

import Photo from "./photo";
import flickrApi from "../../api/flickrApi";
import Masonry from "react-masonry-component";

class PhotoFeed extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			photos: []
		}
    
		this._generatePhotos = this._generatePhotos.bind(this);
	}

	_generatePhotos() {
		return this.props.photos.map(function(data, index) {
			return <Photo key={index} photoData={data} />;
		});
	}

	componentWillMount() {
		var tags = this.props.defaultTags;
		var self = this;
	}

	render() {
        
        var masonryOptions = {
            transitionDuration: 0
        };
        
		return (
			<div className="feed">
                <Masonry
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                >
                    {this._generatePhotos()}
                </Masonry>
			</div>
		)
	}
}

export default PhotoFeed;
