"use strict";

import React from "react";
import { render } from "react-dom";

class App extends React.Component {
	render() {
		return (
			<div>
				<div>This is the photo app</div>
				{this.props.children}
			</div>
		)
	}
}

export default App;