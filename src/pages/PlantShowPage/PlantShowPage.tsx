import React, { Component, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { PlantFromObnoxiousDatabase, FeatureCollection } from '../../typescript/utils';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import reportsService from '../../services/reportsService';

const initialPlantData: PlantFromObnoxiousDatabase = {
    _id: '',
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
};

const initialState = {
    plant: initialPlantData,
    showPlantLocations: false,
    featureCollection: {},
    featureCollectionFound: false
};

type IProps = {
    location: {
        state: {
            plant: PlantFromObnoxiousDatabase
        }
    },
    parseTaxonomy: (plant: object) => string[],
    parseDistribution: (plant: object) => string
}

type IState = Readonly<typeof initialState>;

class PlantShowPage extends Component<IProps, IState> {
    readonly state: IState = initialState;

    getPlant() {
        const plant: PlantFromObnoxiousDatabase = this.props.location.state.plant;
        this.setState((state) => ({
            ...state,
            plant
        }));
    }

    getReportedLocations = async (plantId: string) => {
        return await reportsService.getPlantReportedLocations(plantId);
    }

    handleClick = async (e: MouseEvent) => {
        e.preventDefault();
        const featureCollection: FeatureCollection = await this.getReportedLocations(this.state.plant._id);
        this.setState({
            showPlantLocations: true,
            featureCollection,
            featureCollectionFound: featureCollection.features.length ? true : false
        });
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount = () => {
        this.getPlant();
    }

    render() {
        return (
            <>
                <div className="row row-center-card mt5vh">
                    <div className="col s12 m4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-title">
                                    Detail for {this.state.plant.commonName}
                                </div>
                                <div>
                                    <div className="input-field col s12 left-align">
                                        <h6>Scientific Name:</h6>
                                        <p className="inline-el">{this.state.plant.scientificName}</p>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <h6>Taxonomy:</h6>
                                        <p className="inline-el">{this.props.parseTaxonomy(this.state.plant)}</p>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <h6>Distribution in the US:</h6>
                                        <p className="inline-el">{this.props.parseDistribution(this.state.plant)}</p>
                                    </div>
                                    <div className="col-sm-12 text-center">
                                        <p>Source data: <a href={this.state.plant.nsxUrl} target="_blank" rel="noopener noreferrer">NatureServeExplorer</a></p>
                                    </div>
                                    <div className="col-sm-12 text-center button-row">
                                        <Link to='/plants' className="btn btn-default">BACK</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-center-card PlantShowPage-row mt5vh">
                    {this.state.showPlantLocations ?
                        <>
                            {this.state.featureCollectionFound ?
                                <MapDisplay
                                    type='showPlant'
                                    featureCollection={this.state.featureCollection}
                                />
                                :
                                <div className="col s12 m4">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-content">
                                                <p>Sorry, no reports have been recorded yet for {this.state.plant.commonName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                        :
                        <>
                                <div className="col s12 m4">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-title">
                                                Show map?
                                        </div>
                                            <div className="col-sm-12 text-center button-row">
                                                <button
                                                    className="btn btn-default"
                                                    onClick={this.handleClick}
                                                >
                                                    MAP
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </>
        )
    }
}

export default PlantShowPage;