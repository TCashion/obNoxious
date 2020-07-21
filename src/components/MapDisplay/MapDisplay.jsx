import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import mapboxService from '../../services/mapboxService';

class MapDisplay extends Component {

    getMapBoxToken = async () => {
        const mapBoxToken = await mapboxService.getMapBoxAccessToken();
        return mapBoxToken;
    }

    initMap = async () => {
        const locations = this.props.reportData.location;
        mapboxgl.accessToken = await this.getMapBoxToken();
        var map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
            center: [locations.long, locations.lat], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
        this.initMapMarkers(locations, map)
    }

    initMapMarkers = (locations, map) => {
        const markerCoordsLngLat = [locations.long, locations.lat]
        return new Marker({ draggable: true })
            .setLngLat(markerCoordsLngLat)
            .addTo(map)
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount() {
        this.initMap();
    }

    render() {
        return (
            <div className="col s12 m6">
                <div className="card ReportShow-card">
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