import React, { Component } from 'react';
import * as natureserveAPI from '../../../services/natureserveAPI';
import './AddPlant.css';

const style = {
    marginTop: '20vh',
}

class AddPlant extends Component {
    state = {
        plant: {
            user: this.props.user._id,
            commonName: '',
            scientificName: '',
            taxonomy: {},
            distribution: [],
            nsxUrl: '',
        },
        message: '',
    }

    addPlantToState = (plant) => {
        const distribution = [];
        plant.nations.forEach((nation) => {
            if (nation.nationCode === 'US') {
                nation.subnations.forEach(subnation => distribution.push(subnation.subnationCode))
            };
        });

        const plantAttributes = {
            commonName: plant.primaryCommonName,
            scientificName: plant.scientificName,
            taxonomy: {
                kingdom: plant.speciesGlobal.kingdom ? plant.speciesGlobal.kingdom : undefined,
                phylum: plant.speciesGlobal.phylum ? plant.speciesGlobal.phylum : undefined,
                class: plant.speciesGlobal.taxclass ? plant.speciesGlobal.taxclass : undefined,
                order: plant.speciesGlobal.taxorder ? plant.speciesGlobal.taxorder : undefined,
                family: plant.speciesGlobal.family ? plant.speciesGlobal.family : undefined,
                genus: plant.speciesGlobal.genus ? plant.speciesGlobal.genus : undefined
            },
            distribution,
            nsxUrl: 'https://explorer.natureserve.org' + plant.nsxUrl
        }
        this.setState((state) => ({
            plant: {
                ...state.plant,
                ...plantAttributes
            }
        }));
    }

    getNatureServePlant = async (searchTerm) => {
        const plant = await natureserveAPI.getPlantInfo(searchTerm);
        return plant;
    }

    handleChange = (e) => {
        e.persist();
        this.updateMessage('');
        this.setState((state) => ({
            plant: {
                ...state.plant,
                commonName: e.target.value
            }
        }));
    }

    handleSubmitSearch = async (e) => {
        e.preventDefault();
        try {
            const newPlant = await this.getNatureServePlant(this.state.plant.commonName);
            this.verifyInvasiveSpecies(newPlant.results[0])
                ? this.addPlantToState(newPlant.results[0])
                :
                this.updateMessage('Your search term did not result in any known invasive species. Please try a different term.')
        } catch (err) {
            this.updateMessage('Error - try another search term.')
        }
    }

    parseDistribution = () => {
        let distribution = this.state.plant.distribution.map(contaminatedState => contaminatedState);
        distribution.sort();
        return distribution.join(', ')
    }


    parseTaxonomy = () => {
        let taxonomy = [];
        for (const key in this.state.plant.taxonomy) {
            const upperKey = key[0].toUpperCase() + key.substr(1);
            const pairString = `${upperKey}: ${this.state.plant.taxonomy[key]}`
            taxonomy.push(pairString)
        };
        return taxonomy.join(' > ');
    }

    updateMessage = (msg) => {
        this.setState({
            message: msg,
        });
    }

    verifyInvasiveSpecies = (speciesData) => {
        const nations = speciesData.nations;
        let invasive = false;
        nations.forEach((nation, idx) => {
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
                <div className="row row-center-card" style={style}>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                {this.state.plant.nsxUrl ?
                                    <>
                                        <div className="card-title">
                                            Is this the plant you wish to add to the database?:
                                        </div>
                                        <div>
                                            <form >
                                                <div className="input-field col s12">
                                                    <label for="commonName" className="active">Common Name:</label>
                                                    <input type="text" className="validate" value={this.state.plant.commonName} name="commonName" disabled />
                                                </div>
                                                <div className="input-field col s12">
                                                    <label for="scientificName" className="active">Scientific Name:</label>
                                                    <input type="text" className="validate" value={this.state.plant.scientificName} name="scientificName" disabled />
                                                </div>
                                                <div className="input-field col s12">
                                                    <label for="taxonomy" className="active">Taxonomy:</label>
                                                    <textarea name="taxonomy" className="materialize-textarea" id="taxonomy" cols="30" rows="10" disabled>{this.parseTaxonomy()}</textarea>
                                                </div>
                                                <div className="input-field col s12">
                                                    <label for="distribution" className="active">Distribution:</label>
                                                    <textarea name="distribution" className="materialize-textarea" id="distribution" cols="30" rows="10" disabled>{this.parseDistribution()}</textarea>
                                                </div>
                                                <div className="col-sm-12 text-center">
                                                    <button className="btn btn-default">Yes</button> 
                                                    <button className="btn btn-danger">No</button> 
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
                                            Enter the common name for the plant you wish to add:
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
                <p style={{ color: 'crimson' }}>{this.state.message}</p>
            </>
        )
    }
}

export default AddPlant;