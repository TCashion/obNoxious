import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import mapboxService from '../../services/mapboxService';
import './MapDisplay.css';

class MapDisplay extends Component {

    state = {
        addMarkerOpen: false,
    }

    getClientCurrentPosition = () => {
        return navigator.geolocation.getCurrentPosition(this.setClientPosition);
    }

    getLatestMarker = () => {
        const featuresArr = this.props.reportData.featureCollection.features;
        return featuresArr[featuresArr.length - 1];
    }

    getMarkersArr = () => {
        let filledMarkersArr = [];
        if (this.props.type === 'createReport') {
            const markerObj = {
                id: null, 
                coordinates: this.state.clientPositionLngLat
            };
            filledMarkersArr.push(markerObj);
        } else if (this.props.type === 'showReport') {
            this.props.reportData.featureCollection.features.forEach((feature) => {
                feature.geometry.coordinates.forEach((pointCoordinates) => {
                    const markerObj = {
                        id: feature._id,
                        coordinates: pointCoordinates
                    }
                    filledMarkersArr.push(markerObj)
                });
            });
        };
        return filledMarkersArr;
    }

    getMapBoxToken = async () => {
        const mapBoxToken = await mapboxService.getMapBoxAccessToken();
        return mapBoxToken;
    }

    handleAddMarker = () => {
        const newMarker = this.getLatestMarker();
        this.props.handleAddFeature(newMarker);
        this.setState({ addMarkerOpen: false });
    }

    handleAddMarkerToggle = async () => {
        await this.setState((state) => ({
            addMarkerOpen: !(state.addMarkerOpen)
        }));
        if (this.state.addMarkerOpen) {
            this.props.addNewMarkerToReportData(this.state.mapCenter);
            this.initMap();
        };
    }

    handleCancelAddMarker = async () => {
        await this.props.handleCancelAddFeature();
        this.setState({ addMarkerOpen: false });
        this.initMap();
    }

    initMap = async () => {
        const markersArr = this.getMarkersArr();
        mapboxgl.accessToken = await this.getMapBoxToken();
        const map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
            center: markersArr[markersArr.length - 1].coordinates, // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
        map.on('moveend', () => this.setMapCenterInState(map));
        this.initExistingMapMarkers(markersArr, map);
        this.setMapCenterInState(map);
    }

    initExistingMapMarkers = (markersArr, map) => {
        markersArr.forEach((marker) => {
            const markerCoordsLngLat = marker.coordinates;
            const newMarker = new Marker({ draggable: true })
                .setLngLat(markerCoordsLngLat)
                .addTo(map)
            newMarker.on('dragend', () => this.handleDrag(newMarker));
            if (this.props.type === 'showReport') newMarker.getElement().setAttribute('id', marker.id)
        });
    }

    handleDrag(marker) {
        const markerId = marker.getElement().id;
        const newLngLat = marker.getLngLat();
        this.props.handleMoveMarker(markerId, newLngLat);
    }

    setClientPosition = (position) => {
        const clientPositionLngLat = [position.coords.longitude, position.coords.latitude];
        this.setState({ clientPositionLngLat });
        const updatedMarkerObj = {coordinates: clientPositionLngLat};
        this.props.setClientCoordinatesToForm(updatedMarkerObj);
        this.initMap();
    }

    setMapCenterInState = (map) => {
        this.setState({ mapCenter: map.getCenter() });
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount() {
        if (this.props.type === 'createReport') this.getClientCurrentPosition();
        if (this.props.type === 'showReport') this.initMap();
    }

    render() {
        return (
            <div className="col s12 m6">
                <div className="card MapDisplay-card">
                    <h4>{this.props.type === 'createReport' ? 'Report location: ' : 'Reported Location(s): '}</h4>
                    <p>{this.props.type === 'createReport' ? 'Mark the initial point here. You can add more points on the next page.' : null}</p>
                    <div className="card-content">
                        <div className="MapDisplay-content">
                            <div id="map-container">
                                <div id='map'></div>
                            </div>
                        </div>
                    </div>
                    {(this.props.type === 'showReport' && this.props.user._id === this.props.reportData.user._id) ?
                        <div className="MapDisplay-btn-display">
                            <button
                                className="btn btn-default"
                                onClick={this.handleAddMarkerToggle}
                                style={{display: this.state.addMarkerOpen ? 'none' : 'inline-block'}}
                            >ADD ANOTHER POINT</button>
                            {this.state.addMarkerOpen ?
                                <>
                                    <button
                                        className="btn btn-default"
                                        onClick={this.handleAddMarker}
                                    >SAVE</button>
                                    <button
                                        className="btn btn-default"
                                        onClick={this.handleCancelAddMarker}
                                    >CANCEL</button>
                                </>
                                :
                                null
                            }
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default MapDisplay;