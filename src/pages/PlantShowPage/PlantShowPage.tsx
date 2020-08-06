import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PlantForObnoxiousDatabase } from '../../typescript/utils';

const initialState = {
    plantData: {
        user: '',
        commonName: '',
        scientificName: '',
        taxonomy: {
            kingdom: '',
            phylum: '',
            class: '',
            order: '',
            family: '',
            genus: '',
        },
        distribution: [],
        nsxUrl: '',
    }
};

type IProps = {
    location: {
        state: {
            plant: PlantForObnoxiousDatabase
        }
    },
    parseTaxonomy: (plant: object) => string[],
    parseDistribution: (plant: object) => string
}

type IState = Readonly<typeof initialState>;

class PlantShowPage extends Component<IProps, IState> {
    // state = {
    //     plantData: this.props.location.state.plant
    // }
    readonly state = initialState;

    getPlantData() {
        // return {
        //     ...this.props.location.state.plant
        // }
        const plantData: PlantForObnoxiousDatabase = this.props.location.state.plant
        this.setState((state) => ({
            plantData: {
                ...state.plantData,
                plantData
            }
        }));
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount = () => {
        this.getPlantData();
    }

    render() {
        return (
            <>
                <div className="row row-center-card mt15vh">
                    <div className="col s12 m4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-title">
                                    Detail for {this.state.plantData.commonName}
                                </div>
                                <div>
                                    <div className="input-field col s12 left-align">
                                        <h6>Scientific Name:</h6>
                                        <p className="inline-el">{this.state.plantData.scientificName}</p>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <h6>Taxonomy:</h6>
                                        <p className="inline-el">{this.props.parseTaxonomy(this.state.plantData)}</p>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <h6>Distribution in the US:</h6>
                                        <p className="inline-el">{this.props.parseDistribution(this.state.plantData)}</p>
                                    </div>
                                    <div className="col-sm-12 text-center">
                                        <p>Source data: <a href={this.state.plantData.nsxUrl} target="_blank" rel="noopener noreferrer">NatureServeExplorer</a></p>
                                    </div>
                                    <div className="col-sm-12 text-center button-row">
                                        <Link to='/plants' className="btn btn-default">BACK</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PlantShowPage;