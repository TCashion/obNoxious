import React, { Component } from 'react';

class AddReportPage extends Component {
    state = {
        message: '',
        messageColor: 'crimson',
        report: {
            user: this.props.user,
            noxiousSpecies: '',
            date: Date.now()
        }
    }

    handleChange = (e) => {
        e.persist();
        this.updateMessage('', 'crimson');
        this.setState((state) => ({
            report: {
                ...state.report,
                [e.target.name]: e.target.value
            }
        }));
    }

    updateMessage = (msg, color) => {
        this.setState({
            message: msg,
            messageColor: color
        });
    }

    updateSelectOptions() {
        const script =
            `
                const selectEls = document.querySelectorAll('select');
                const instances = M.FormSelect.init(selectEls);
            `
        const scriptDiv = document.createElement('script');
        scriptDiv.innerHTML = script;
        document.body.appendChild(scriptDiv)
    }

    componentDidMount() {
        this.updateSelectOptions();
    }

    render() {
        return (
            <>
                <div className="row row-center-card mt15vh">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content" style={{ 'overflow': 'hidden' }}>
                                <div className="card-title">
                                    Create your report here:
                                </div>
                                <div>
                                    <form onSubmit={this.handleSubmitConfirmation}>
                                        <div className="input-field col s12">
                                            <label htmlFor="noxiousSpecies" className="active">Species sighted:</label>
                                            {/* <input type="select" value={this.state.report.noxiousSpecies} 
                                            name="noxiousSpecies" onChange={this.handleChange} /> */}
                                            <select
                                                className="browser-default"
                                                name="noxiousSpecies"
                                                onChange={this.handleChange}
                                            >
                                                <option value="1">Select species</option>
                                                {this.props.plants.map((plant, idx) =>
                                                    <option
                                                        defaultValue={idx === 0 ? true : false}
                                                        key={plant._id}
                                                    >{plant.commonName}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="input-field col s12">
                                            <label htmlFor="scientificName" className="active">Scientific Name:</label>
                                            {/* <input type="text" className="validate" value={this.state.plant.scientificName} name="scientificName" disabled /> */}
                                        </div>
                                        <div className="input-field col s12">
                                            <label htmlFor="taxonomy" className="active">Taxonomy:</label>
                                            {/* <textarea name="taxonomy" className="materialize-textarea" id="taxonomy" cols="30" rows="10" disabled value={this.props.parseTaxonomy(this.state.plant)} /> */}
                                        </div>
                                        <div className="input-field col s12">
                                            <label htmlFor="distribution" className="active">US Distribution:</label>
                                            {/* <textarea name="distribution" className="materialize-textarea" id="distribution" cols="30" rows="10" disabled value={this.props.parseDistribution(this.state.plant)} /> */}
                                        </div>
                                        <div className="col-sm-12 text-center button-row">
                                            {/* <button type="submit" className="btn btn-default" disabled={this.scanExistingPlants(this.state.plant.scientificName)}>Yes</button> */}
                                            {/* <button className="btn btn-danger" onClick={this.handleWrongPlant}>No</button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ color: `${this.state.messageColor}` }}>{this.state.message}</p>
            </>
        )
    }
}

export default AddReportPage;