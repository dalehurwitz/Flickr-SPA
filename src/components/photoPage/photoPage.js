"use strict";

import React from "react";
import Search from "../common/search";
import PhotoFeed from "./photoFeed";
import PhotoStore from "../../stores/photoStore";
import PhotoActions from "../../actions/photoActions";
import { hashHistory } from "react-router";
import Waypoint from "react-waypoint";
import Loader from "../common/loader";

class PhotoPage extends React.Component {
    
    constructor(props, context) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.state = PhotoStore.getState();
        this.state.loadingNewPhotoSet = true;
        this.state.placeholder = "Enter a tag...";
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
            this.setState({ loadingNewPhotoSet: false });
            PhotoActions.getPhotosByTags(this.state.currentPhotoTags, this.state.currentResultsPage+1);
        }
    }
    
    _onRouteChange(route) {
        var tags = route.pathname.replace("/","");
        if(tags === "") tags = this.state.defaultPhotoTags;
        this.setState({ 
            loadingNewPhotoSet: true,
            placeholder: tags
        });
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
        if(this.state.loadingNewPhotoSet) {
            window.scrollTo(0,0);
        }
        if(this.state.loadingPhotos && this.state.loadingNewPhotoSet) {
            return (
                <Loader message="Loading photos..." />
            )
        };
    }
    
    _renderWaypoint() {
        if(!this.state.loadingPhotos) {
            return (
                <Waypoint
                    onEnter={this._loadMorePhotos.bind(this)}
                    threshold={2} 
                />
            )
        }
    }
    
	render() {
		return (
			<div>
                <Search onClick={this.onSearch} placeholder={this.state.placeholder} />
                <h1 className="feed__feed-header">{"'" + this.state.currentPhotoTags + "'"}</h1>
				<PhotoFeed photos={this.state.photos} />
                {this._renderLoader()}
                {this._renderWaypoint()}
			</div>
		)
	}
}

PhotoPage.contextTypes = {
    router: React.PropTypes.object
}

export default PhotoPage;
