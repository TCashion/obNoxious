import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css';
import './AddReportPage.css';
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

    handleSubmit = async (e) => {
        e.preventDefault(); 
        const newReport = await this.props.handleAddReport(this.state.report);
        this.props.history.push({
            pathname: '/reports/detail',
            state: {
                report: this.props.getOneReport(newReport._id)
            }
        });
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
                selectEls = document.querySelectorAll('select');
                selectInstances = M.FormSelect.init(selectEls);
            `
        const scriptDiv = document.createElement('script');
        scriptDiv.innerHTML = script;
        document.body.appendChild(scriptDiv)
    }

    componentDidMount() {
        this.updateSelectOptions();
    }

    validateForm() {
        return !(this.state.report.noxiousSpecies);
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
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="input-field col s12">
                                            <label htmlFor="noxiousSpecies" className="active">Species sighted:</label>
                                            <select
                                                className="browser-default form-select"
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
                                            <p className="whisper">Can't find what you're looking for? <Link to='../plants/new'>Add it to the database.</Link></p>
                                        </div>
                                        <div className="input-field col s12">
                                            <label htmlFor="scientificName" className="active">Date observed:</label>
                                            <DatePicker
                                                defaultValue={this.state.report.date}
                                                id="date"
                                                onChange={this.handleDateChange} 
                                            />
                                        </div>
                                        <div className="col-sm-12 text-center button-row">
                                            <button type="submit" className="btn btn-default" disabled={this.validateForm()}>Create Report</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ color: `${this.state.messageColor}` }}>{this.state.message}</p>
                <script>{`let selectEls; let selectInstances`}</script>
            </>
        )
    }
}

export default AddReportPage;