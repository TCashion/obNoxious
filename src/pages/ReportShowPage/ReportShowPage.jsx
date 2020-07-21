import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './ReportShowPage.css';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import AddNoteModal from '../../components/AddNoteModal/AddNoteModal';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';
import notesService from '../../services/notesService';
import mapboxService from '../../services/mapboxService';

class ReportShowPage extends Component {
    state = {
        reportData: { ...this.getInitialReportState() }
    }

    getInitialReportState() {
        if (localStorage.getItem('reportData')) {
            return JSON.parse(localStorage.getItem('reportData'));
        } else {
            return this.props.location.state.report
        }
    }

    getMapBoxToken = async () => {
        const mapBoxToken = await mapboxService.getMapBoxAccessToken();
        return mapBoxToken;
    }

    handleAddNote = async (note) => {
        const updatedReport = await notesService.createNote(note);
        this.setState((state) => ({
            reportData: updatedReport
        }));
        this.saveStateToLocalStorage(this.state.reportData);
        this.props.history.push({
            pathname: '/reports/detail',
            state: this.state
        });
    }

    handleDeleteNote = async (note) => {
        note.user = this.state.reportData.user;
        note.reportId = this.state.reportData._id;
        const updatedReport = await notesService.deleteNote(note);
        this.setState((state) => ({
            reportData: updatedReport
        }));
        this.saveStateToLocalStorage(this.state.reportData);
        this.props.history.push({
            pathname: '/reports/detail',
            state: this.state
        });
    }

    initMap = async () => {
        mapboxgl.accessToken = await this.getMapBoxToken();
        var map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-105, 39.75], // starting position [lng, lat]
            zoom: 10 // starting zoom
        });
        return map;
    }

    removeStateFromLocalStorage = () => {
        localStorage.removeItem('reportData');
    }

    saveStateToLocalStorage = (reportData) => {
        localStorage.setItem('reportData', JSON.stringify(reportData))
    }

    sortNotesByDateAscending = () => {
        const reportDataCopy = { ...this.state.reportData };
        const notesCopy = [...reportDataCopy.notes];
        notesCopy.sort(this.props.sortByDateAscending);
        reportDataCopy.notes = notesCopy;
        this.setState((state) => ({
            reportData: reportDataCopy
        }))
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount() {
        this.sortNotesByDateAscending();
        this.initMap();
    }

    componentWillUnmount() {
        this.removeStateFromLocalStorage();
    }

    render() {
        return (
            <>
                <div className="ReportShow-container">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card ReportShow-card">
                                <div className="card-content">
                                    <div className="card-title">
                                        Detail for reported sighting of <span className="ReportShow-emphasized">{this.state.reportData.noxiousSpecies.commonName}</span> on <span className="ReportShow-emphasized">{this.state.reportData.date.split('T')[0]}</span>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <p>Report created by <span className="ReportShow-emphasized">{this.state.reportData.user.name}</span></p>
                                    </div>
                                    <div>
                                        {this.state.reportData.user._id === this.props.user._id ?
                                            <div className="col-sm-12 text-center button-row">
                                                <DeleteModal
                                                    itemData={this.state.reportData}
                                                    handleDeleteItem={this.props.handleDeleteReport}
                                                    history={this.props.history}
                                                    itemType='report'
                                                    redirectRoute='/reports'
                                                />
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="card ReportShow-card">
                                <div className="card-content" id="map-container">
                                    <div className="card-title">
                                        MAP
                                    </div>
                                    <div id='map' style={{ width: '400px', height: '300px' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12">
                            <div className="card ReportShow-card">
                                <div className="card-content">
                                    <div className="card-title">
                                        Notes:
                                        {this.state.reportData.user._id === this.props.user._id ?
                                            <div className="col-sm-12 button-row" style={{ display: 'inline' }}>
                                                <AddNoteModal
                                                    refreshReportData={this.refreshReportData}
                                                    getTodaysDate={this.props.getTodaysDate}
                                                    handleAddNote={this.handleAddNote}
                                                    history={this.props.history}
                                                    reportData={this.state.reportData}
                                                    parseDate={this.props.parseDate}
                                                />
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                    <div className="input-field col s12">
                                        {this.state.reportData.notes.length ?
                                            <>
                                                <p>Notes submitted by {this.state.reportData.user.name}:</p>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            {this.state.reportData.user._id === this.props.user._id ?
                                                                <th></th>
                                                                :
                                                                <></>
                                                            }
                                                            <th>Date</th>
                                                            <th>Note</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.reportData.notes.map((note) =>
                                                            <tr key={note._id}>
                                                                {this.state.reportData.user._id === this.props.user._id ?
                                                                    <td>
                                                                        <div className="col-sm-12 button-row" style={{ display: 'inline' }}>
                                                                            <DeleteNoteModal
                                                                                handleDeleteNote={this.handleDeleteNote}
                                                                                note={note}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <></>
                                                                }
                                                                <td>{this.props.parseDate(note.date)}</td>
                                                                <td>{note.body}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </>
                                            :
                                            <>
                                                <h6 className="left-align" style={{ display: 'inline' }}>No notes, yet.</h6>
                                            </>
                                        }
                                    </div>
                                    <div>
                                        <p>Check back later for updates.</p>
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

export default ReportShowPage;