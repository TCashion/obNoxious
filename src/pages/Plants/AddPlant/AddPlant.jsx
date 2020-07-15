import React, { Component } from 'react';
import * as natureserveAPI from '../../../services/natureserveAPI';
import NewPlantForm from '../../../components/NewPlantForm/NewPlantForm';

class AddPlant extends Component{
    state = {
        plant: {}, 
        message: ''
    }

    getNatureServePlant = async (searchTerm) => {
        const plant = await natureserveAPI.getPlantInfo(searchTerm);
        return plant;
    }

    updateMessage = (msg) => {
        this.setState({
            message: msg,
        });
    }

    render() {
        return(
            <>
                <NewPlantForm 
                    updateMessage={this.updateMessage}
                    getNatureServePlant={this.getNatureServePlant}
                />
                <p>{this.state.message}</p>
            </>
        )
    }
}

export default AddPlant;