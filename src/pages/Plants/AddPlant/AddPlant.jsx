import React, { Component } from 'react';
import * as natureserveAPI from '../../../services/natureserveAPI';

class AddPlant extends Component {
    state = {
        plant: {
            user: this.props.user._id,
            commonName: '',
            scientificName: '',
            description: '',
            observationNotes: '',
            taxonomy: '',
            distribution: '',
            nsxUrl: '',
        },
        message: '', 
        newState: ''
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

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await this.getNatureServePlant(this.state.plant.commonName);
        } catch (err) {
            this.props.updateMessage('Error - try another search term.')
        }
    }

    updateMessage = (msg) => {
        this.setState({
            message: msg,
        });
    }

    validateForm() {
        return !(this.state.plant.commonName);
    }

    render() {
        return (
            <>
                <div className="row row-center-card">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-title">
                                    Enter the common name for the plant you wish to add:
                            </div>
                                <div>
                                    <form onSubmit={this.handleSubmit} >
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder="Common Name" value={this.state.plant.commonName} name="commonName" onChange={this.handleChange} />
                                        </div>
                                        <div className="col-sm-12 text-center">
                                            <button className="btn btn-default" disabled={this.validateForm()}>Search</button> the <a href="https://explorer.natureserve.org/" target="_blank" rel="noopener noreferrer">NatureServeExplorer</a> Database&nbsp;&nbsp;&nbsp;
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>{this.state.message}</p>
            </>
        )
    }
}

export default AddPlant;