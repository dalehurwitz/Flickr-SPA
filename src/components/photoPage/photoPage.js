"use strict";

import React from "react";

import PhotoFeed from "./photoFeed";

class PhotoPage extends React.Component {
	render() {
		return (
			<div>
				<PhotoFeed defaultTag={"coffee"} />
			</div>
		)
	}
}

export default PhotoPage;
