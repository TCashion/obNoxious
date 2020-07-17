import React, { Component } from 'react';
import 'materialize-css';
import { DatePicker } from 'react-materialize';

class AddReportPage extends Component {
    state = {
        message: '',
        messageColor: 'crimson',
        report: { ...this.getInitialReportState() }
    }

    getInitialReportState() {
        return {
            user: this.props.user,
            noxiousSpecies: '',
            date: this.getToday()
        }
    }

    getToday() {
        const today = new Date();
        return this.parseDate(today);
    }

    handleChange = (e) => {
        e.persist();
        console.log(e.target)
        this.updateMessage('', 'crimson');
        this.setState((state) => ({
            report: {
                ...state.report,
                [e.target.name]: e.target.value
            }
        }));
    }

    handleDateChange = (e) => {
        this.setState((state) => ({
            report: {
                ...state.report, 
                date: this.parseDate(e)
            }
        }))
    }

    parseDate(date) {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        const dd = date.getDate();
        return `${yyyy}-${mm}-${dd}`
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
                const dateEls = document.querySelectorAll('.datepicker');
                const selectInstances = M.FormSelect.init(selectEls);
                const dateInstances = M.Datepicker.init(dateEls, {format: 'yyyy-mm-dd'});
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
                                            <label htmlFor="scientificName" className="active">Date observed:</label>
                                            <DatePicker
                                                value={this.state.report.date}
                                                id="date"
                                                onChange={this.handleDateChange} 
                                            />
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