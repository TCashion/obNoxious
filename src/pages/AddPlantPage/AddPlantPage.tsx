import React, { Component, FormEvent } from 'react';
import { PlantForObnoxiousDatabase, PlantFromNatureServe } from '../../typescript/utils';
import * as natureserveAPI from '../../services/natureserveAPI';
import './AddPlantPage.css';

const initialState = {
    existingPlantFound: false,
    plant: {
        user: '',
        commonName: '',
        scientificName: '',
        taxonomy: {},
        distribution: [''],
        nsxUrl: ''
    },
    message: '',
    messageColor: 'crimson'
}

type IProps = {
    user: {
        _id: string,
    },
    plants: PlantForObnoxiousDatabase[],
    getOnePlant: (scientificName: string) => object;
    handleAddPlant: (plant: object) => void,
    parseTaxonomy: (plant: object) => string[],
    parseDistribution: (plant: object) => string
}

type IState = Readonly<typeof initialState>;

class AddPlantPage extends Component<IProps, IState> {
    readonly state: IState = initialState;

    addPlantToState = (plant: PlantFromNatureServe) => {
        const distribution: string[] = [];
        plant.nations.forEach((nation) => {
            if (nation.nationCode === 'US') {
                nation.subnations.forEach(subnation => distribution.push(subnation.subnationCode))
            };
        });

        const plantAttributes: PlantForObnoxiousDatabase = {
            user: this.props.user._id,
            commonName: plant.primaryCommonName,
            scientificName: plant.scientificName,
            taxonomy: {
                kingdom: plant.speciesGlobal.kingdom ? plant.speciesGlobal.kingdom : '',
                phylum: plant.speciesGlobal.phylum ? plant.speciesGlobal.phylum : '',
                class: plant.speciesGlobal.taxclass ? plant.speciesGlobal.taxclass : '',
                order: plant.speciesGlobal.taxorder ? plant.speciesGlobal.taxorder : '',
                family: plant.speciesGlobal.family ? plant.speciesGlobal.family : '',
                genus: plant.speciesGlobal.genus ? plant.speciesGlobal.genus : ''
            },
            distribution,
            nsxUrl: 'https://explorer.natureserve.org' + plant.nsxUrl
        }
        this.setState(({
            plant: {
                ...plantAttributes
            }
        }));
    }

    getInitialPlantState() {
        return {
            user: this.props.user._id,
            commonName: '',
            scientificName: '',
            taxonomy: {},
            distribution: [],
            nsxUrl: '',
        }
    }

    getNatureServePlant = async (searchTerm: string) => {
        const plant = await natureserveAPI.getPlantInfo(searchTerm);
        return plant;
    }

    handleChange = (e: FormEvent<HTMLInputElement>): void => {
        e.persist();
        this.updateMessage('', 'crimson');
        this.setState((state) => ({
            plant: {
                ...state.plant,
                commonName: (e.target as HTMLInputElement).value
            }
        }));
    }

    handleSubmitConfirmation = (e: FormEvent) => {
        e.preventDefault();
        if (this.state.existingPlantFound) return;
        this.props.handleAddPlant(this.state.plant);
        this.resetPlantState();
        this.updateMessage('Successfully added the plant to the database. Thank you!', 'green')
    }

    handleSubmitSearch = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const newPlant = await this.getNatureServePlant(this.state.plant.commonName);
            const existingPlant = await this.scanExistingPlants(newPlant.results[0].scientificName)
            this.verifyInvasiveSpecies(newPlant.results[0])
                ? this.addPlantToState(newPlant.results[0])
                :
                this.updateMessage('Your search term did not result in any known invasive species. Please try a different term.', 'crimson')
        } catch (err) {
            this.updateMessage('Error - try another search term.', 'crimson')
        }
    }

    handleWrongPlant = () => {
        this.resetPlantState();
    }

    resetPlantState = () => {
        this.setState(({
            plant: this.getInitialPlantState(),
            existingPlantFound: false
        }));
    }

    scanExistingPlants = async (scientificName: string) => {
        let existingPlant = await this.props.getOnePlant(scientificName);
        console.log(existingPlant)
        if (existingPlant) this.setState({ existingPlantFound: true })
    };

    updateMessage = (msg: string, color: string) => {
        this.setState({
            message: msg,
            messageColor: color
        });
    }

    verifyInvasiveSpecies = (speciesData: PlantFromNatureServe): boolean => {
        let invasive = false;
        speciesData.nations.forEach((nation) => {
            if (nation.nationCode === 'US' && nation.subnations[0].exotic && nation.subnations[1].exotic) invasive = true;
        })
        return invasive;
    }

    validateForm() {
        return !(this.state.plant.commonName);
    }

    render() {
        return (
            <>
                <div className="row row-center-card mt15vh">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                {this.state.plant.nsxUrl ?
                                    <>
                                        <div className="card-title">
                                            {this.state.existingPlantFound ?
                                                <>This plant is already exists in the database:</>
                                                :
                                                <>Is this the plant you wish to add to the database?:</>
                                            }
                                        </div>
                                        <div>
                                            <form onSubmit={this.handleSubmitConfirmation}>
                                                <div className="input-field col s12">
                                                    <label htmlFor="commonName" className="active">Common Name:</label>
                                                    <input type="text" className="validate" value={this.state.plant.commonName} name="commonName" disabled />
                                                </div>
                                                <div className="input-field col s12">
                                                    <label htmlFor="scientificName" className="active">Scientific Name:</label>
                                                    <input type="text" className="validate" value={this.state.plant.scientificName} name="scientificName" disabled />
                                                </div>
                                                <div className="input-field col s12">
                                                    <label htmlFor="taxonomy" className="active">Taxonomy:</label>
                                                    <textarea name="taxonomy" className="materialize-textarea" id="taxonomy" cols={30} rows={10} disabled value={this.props.parseTaxonomy(this.state.plant)} />
                                                </div>
                                                <div className="input-field col s12">
                                                    <label htmlFor="distribution" className="active">US Distribution:</label>
                                                    <textarea name="distribution" className="materialize-textarea" id="distribution" cols={30} rows={10} disabled value={this.props.parseDistribution(this.state.plant)} />
                                                </div>
                                                <div className="col-sm-12 text-center button-row">
                                                    {this.state.existingPlantFound ?
                                                        <>
                                                            <button className="btn btn-danger AddPlant-btn" onClick={this.handleWrongPlant}>Cancel</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="submit" className="btn btn-default AddPlant-btn" disabled={this.state.existingPlantFound}
                                                            >Yes</button>
                                                            <button className="btn btn-danger AddPlant-btn" onClick={this.handleWrongPlant}>No</button>
                                                        </>
                                                    }
                                                </div>
                                                <div className="col-sm-12 text-center">
                                                    <p>Data provided by: <a href="https://explorer.natureserve.org/" target="_blank" rel="noopener noreferrer">NatureServeExplorer</a></p>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="card-title">
                                            Enter the common or scientific name for the plant you wish to add:
                                        </div>
                                        <div>
                                            <form onSubmit={this.handleSubmitSearch} >
                                                <div className="col-sm-12">
                                                    <input type="text" className="form-control" placeholder="Common Name" value={this.state.plant.commonName} name="commonName" onChange={this.handleChange} />
                                                </div>
                                                <div className="col-sm-12 text-center">
                                                    <button className="btn btn-default" disabled={this.validateForm()}>Search</button> the <a href="https://explorer.natureserve.org/" target="_blank" rel="noopener noreferrer">NatureServeExplorer</a> Database&nbsp;&nbsp;&nbsp;
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ color: `${this.state.messageColor}` }}>{this.state.message}</p>
            </>
        )
    }
}

export default AddPlantPage;