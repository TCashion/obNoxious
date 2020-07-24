import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import mapboxService from '../../services/mapboxService';
import './MapDisplay.css';

class MapDisplay extends Component {

    getMarkersArr = () => {
        let filledMarkersArr = [];
        if (this.props.type === 'createReport') {
            filledMarkersArr.push(this.state.clientPositionLngLat);
        } else if (this.props.type === 'showReport') {
            this.props.reportData.featureCollection.features.forEach((feature) => {
                feature.geometry.coordinates.forEach((pointCoordinates) => {
                    filledMarkersArr.push(pointCoordinates)
                });
            });
        };
        return filledMarkersArr;
    }

    getCurrentPosition = () => {
        return navigator.geolocation.getCurrentPosition(this.setClientPosition);
    }

    getMapBoxToken = async () => {
        const mapBoxToken = await mapboxService.getMapBoxAccessToken();
        return mapBoxToken;
    }

    initMap = async () => {
        const markersArr = this.getMarkersArr();
        mapboxgl.accessToken = await this.getMapBoxToken();
        var map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
            center: markersArr[0], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
        this.initMapMarkers(markersArr, map);
    }
    
    initMapMarkers = (markersArr, map) => {
        markersArr.forEach((marker) => {
            const markerCoordsLngLat = marker;
            const newMarker = new Marker({ draggable: true })
                .setLngLat(markerCoordsLngLat)
                .addTo(map)
            newMarker.on('dragend', () => this.onDragEnd(newMarker))
        });
    }

    onDragEnd(marker) {
        const newLngLat = marker.getLngLat();
        this.props.handleMoveMarker(newLngLat);
    }

    setClientPosition = (position) => {
        const clientPositionLngLat = [position.coords.longitude, position.coords.latitude];
        this.setState({clientPositionLngLat});
        if (this.props.type === 'createReport') this.props.setClientCoordinatesToForm(clientPositionLngLat);
        this.initMap();
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount() {
        this.getCurrentPosition();
    }

    render() {
        return (
            <div className="col s12 m6">
                <h4>{this.props.type === 'createReport' ? 'Report location: ' : 'Location: '}</h4>
                <div className="card MapDisplay-card">
                    <div className="card-content" id="map-container">
                        <div id='map' style={{ width: '400px', height: '300px' }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MapDisplay;