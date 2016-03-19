"use strict";

import React from "react";
import Search from "../common/search";
import PhotoFeed from "./photoFeed";
import PhotoStore from "../../stores/photoStore";
import PhotoActions from "../../actions/photoActions";
import { hashHistory } from "react-router";

class PhotoPage extends React.Component {
    
    constructor(props, context) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.state = PhotoStore.getState();
        this.state.currentTag = this.state.defaultPhotoTag;
    }
    
    componentWillMount() {
        PhotoStore.listen(this._onChange);
    }
    
    componentWillUnmount() {
        PhotoStore.unlisten(this._onChange);
    }
    
    componentDidMount() {
        var tag = this.props.params.tag || this.state.defaultPhotoTag;
        PhotoActions.getPhotosByTag(tag);
        this.context.router.setRouteLeaveHook(this.props.route, this._onRouteChange);
    }
    
    _onRouteChange(route) {
        var tag = route.pathname.replace("/","");
        if(tag === "") tag = this.state.defaultPhotoTag;
        this.setState({ currentTag: tag });
        PhotoActions.getPhotosByTag(tag);
    }
    
    _onChange() {
        this.setState(PhotoStore.getState());
    }
    
    onSearch(searchTerm) {
        if(searchTerm) {
            PhotoActions.getPhotosByTag(searchTerm);
            this.context.router.push({
                pathname: searchTerm
            });
        }
    }
    
	render() {
        
        var loading = null;
        
        if(this.state.loadingPhotos) {
            loading = (
                <div>Loading...</div>
            ) 
        };
        
		return (
			<div>
                {loading}
                <Search onClick={this.onSearch} />
				<PhotoFeed photos={this.state.photos} />
			</div>
		)
	}
}

PhotoPage.contextTypes = {
    router: React.PropTypes.object
}

export default PhotoPage;
