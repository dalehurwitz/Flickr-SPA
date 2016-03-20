"use strict";

import React from "react";
import Search from "../common/search";
import PhotoFeed from "./photoFeed";
import PhotoStore from "../../stores/photoStore";
import PhotoActions from "../../actions/photoActions";
import { hashHistory } from "react-router";
import Waypoint from "react-waypoint";

class PhotoPage extends React.Component {
    
    constructor(props, context) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.state = PhotoStore.getState();
    }
    
    componentWillMount() {
        PhotoStore.listen(this._onChange);
    }
    
    componentWillUnmount() {
        PhotoStore.unlisten(this._onChange);
    }
    
    componentDidMount() {
        var tags = this.props.params.tags || this.state.defaultPhotoTags;
        PhotoActions.getPhotosByTags(tags);
        this.context.router.setRouteLeaveHook(this.props.route, this._onRouteChange);
    }
    
    _loadMorePhotos() {
        if(this.state.currentResultsPage < this.state.numResultsPages) {
            PhotoActions.getPhotosByTags(this.state.currentPhotoTags, this.state.currentResultsPage+1);
        }
    }
    
    _onRouteChange(route) {
        var tags = route.pathname.replace("/","");
        if(tags === "") tags = this.state.defaultPhotoTags;
        this.setState({ currentPhotoTags: tags });
        PhotoActions.getPhotosByTags(tags);
    }
    
    _onChange() {
        this.setState(PhotoStore.getState());
    }
    
    onSearch(searchTerm) {
        if(searchTerm) {
            PhotoActions.getPhotosByTags(searchTerm);
            this.context.router.push({
                pathname: searchTerm
            });
        }
    }
    
    _renderLoader() {
        if(this.state.loadingPhotos) {
            return (
                <div>Loading...</div>
            )
        };
    }
    
    _renderWaypoint() {
        if(!this.state.loadingPhotos) {
            return (
                <Waypoint
                    onEnter={this._loadMorePhotos.bind(this)}
                    threshold={2.0} 
                />
            )
        }
    }
    
	render() {
		return (
			<div>
                {this._renderLoader()}
                <Search onClick={this.onSearch} />
				<PhotoFeed photos={this.state.photos} />
                {this._renderWaypoint()}
			</div>
		)
	}
}

PhotoPage.contextTypes = {
    router: React.PropTypes.object
}

export default PhotoPage;
