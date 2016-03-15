"use strict";

import React from "react";

import Header from "./common/header";

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div>This is the photo app</div>
				{this.props.children}
			</div>
		)
	}
}

export default App;
