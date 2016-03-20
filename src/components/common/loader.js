"use strict";

import React from "react";

class Loader extends React.Component {
	render() {
		return (
			<div className="loader">
                <span className="loader__message">{this.props.message}</span>
            </div>
		)
	}
}

export default Loader;
