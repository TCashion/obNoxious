import React, { Component } from 'react';

class NewPlantForm extends Component {
    state = {
        commonName: '',
    }

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await this.props.getNatureServePlant(this.state.commonName);
        } catch (err) {
            this.props.updateMessage('Error - try another search term.')
        }
    }

    validateForm() {
        return !(this.state.commonName.length);
    }

    render() {
        return (
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
                                        <input type="text" className="form-control" placeholder="Common Name" value={this.state.commonName} name="commonName" onChange={this.handleChange} />
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
        )
    }
}

export default NewPlantForm;