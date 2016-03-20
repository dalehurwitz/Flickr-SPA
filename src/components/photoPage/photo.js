"use strict";

import React from "react";

import flickrApi from "../../api/flickrApi";

class Photo extends React.Component {
	render() {
		return (
			<div className="feed__item">
				<img className="img-responsive" src={flickrApi.constructImgUrl(this.props.photoData, "n")} alt=""/>
			</div>
		)
	}
}

export default Photo;
