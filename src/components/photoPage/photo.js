"use strict";

import React from "react";

import flickrApi from "../../api/flickrApi";

class Photo extends React.Component {
	render() {
		return (
			<div className="feed__photo">
				<img src={flickrApi.constructImgUrl(this.props.photoData)} alt=""/>
			</div>
		)
	}
}

export default Photo;
