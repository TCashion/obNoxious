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
        const location = this.props.location ? this.props.location : this.state.clientPositionLngLat;
        mapboxgl.accessToken = await this.getMapBoxToken();
        var map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
            center: location, // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
        this.initMapMarkers(location, map)
    }

    initMapMarkers = (location, map) => {
        const markerCoordsLngLat = location
        const marker = new Marker({ draggable: true })
            .setLngLat(markerCoordsLngLat)
            .addTo(map)
        marker.on('dragend', () => this.onDragEnd(marker))
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