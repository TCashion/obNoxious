import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import mapboxService from '../../services/mapboxService';
import './MapDisplay.css';

class MapDisplay extends Component {

    getCurrentPosition = () => {
        return navigator.geolocation.getCurrentPosition(this.setClientPosition);
    }

    setClientPosition = (position) => {
        const clientPositionLngLat = [position.coords.longitude, position.coords.latitude];
        this.setState({clientPositionLngLat});
        if (this.props.type === 'createReport') this.props.setClientCoordinatesToForm(clientPositionLngLat);
        this.initMap();
    }

    getMapBoxToken = async () => {
        const mapBoxToken = await mapboxService.getMapBoxAccessToken();
        return mapBoxToken;
    }

    initMap = async () => {
        // if this is the createReport page, set one value as client location then pass that in to initmarker
        let markersArr = [];
        if (this.props.type === 'createReport') {
            markersArr.push(this.state.clientPositionLngLat);
        }
        // if it's a show page, this could be an array, 
        // so get array from report data 
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

    /* ---------- Lifecycle methods ---------- */

    async componentDidMount() {
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