"use strict";

import React from "react";

class Search extends React.Component {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this._submitHandler = this._submitHandler.bind(this);
        this.state = {
            searchTerm: "",
        }
    }
    
    _onChange(e) {
        this.setState({searchTerm: e.target.value});
    }
    
    _submitHandler(e) {
        e.preventDefault();
        this.props.onClick(this.state.searchTerm);
        this.setState({ 
            placeholder: this.state.searchTerm,
            searchTerm: "" 
        });
        this.refs.textInput.blur();
    }
    
	render() {
		return (
			<form className="search-form search-form--inline fixed-top">
                <input type="text" placeholder={this.props.placeholder} ref="textInput" onChange={this._onChange} value={this.state.searchTerm} />
                <button type="submit" onClick={this._submitHandler} >Search</button>
            </form>
		)
	}
}

export default Search;
