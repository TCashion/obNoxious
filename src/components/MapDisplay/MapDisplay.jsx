import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import mapboxService from '../../services/mapboxService';
import './MapDisplay.css';

class MapDisplay extends Component {

    getCurrentPosition = () => {
        return navigator.geolocation.getCurrentPosition(this.setClientPosition);
    }

    setClientPosition = (position) => {
        this.setState({
            clientPositionLngLat: [position.coords.longitude, position.coords.latitude]
        });
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
            center: [location.lng, location.lat], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
        this.initMapMarkers(location, map)
    }

    initMapMarkers = (location, map) => {
        const markerCoordsLngLat = [location.long, location.lat]
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
        // this.initMap();
    }

    render() {
        return (
            <div className="col s12 m6">
                <div className="card MapDisplay-card">
                    <div className="card-content" id="map-container">
                        <div className="card-title">
                            MAP
                                    </div>
                        <div id='map' style={{ width: '400px', height: '300px' }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MapDisplay;