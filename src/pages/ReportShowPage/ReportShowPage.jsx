import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ReportShowPage.css';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import AddNoteModal from '../../components/AddNoteModal/AddNoteModal';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';
import featuresService from '../../services/featuresService';
import notesService from '../../services/notesService';
import reportsService from '../../services/reportsService';
import MapDisplay from '../../components/MapDisplay/MapDisplay';

class ReportShowPage extends Component {
    state = {
        report: { ...this.getInitialReportState() }
    }

    addNewMarkerToReport = (mapCenter) => {
        const newMarkerData = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [[mapCenter.lng, mapCenter.lat]]
            }
        };
        const reportCopy = { ...this.state.report };
        const featureCollectionCopy = { ...reportCopy.featureCollection };
        const featuresCopy = [...featureCollectionCopy.features]
        featuresCopy.push(newMarkerData);
        featureCollectionCopy.features = featuresCopy;
        reportCopy.featureCollection = featureCollectionCopy;
        this.setState({
            report: reportCopy
        });
    }

    copyFeatureCollectionAndUpdate = (feature, updatedMarkerObj, idx) => {
        const reportCopy = { ...this.state.report };
        const featureCollectionCopy = { ...reportCopy.featureCollection };
        const featuresCopy = [...featureCollectionCopy.features];
        const featureCopy = { ...feature };
        const geometryCopy = { ...featureCopy.geometry };
        let coordinatesCopy = [...geometryCopy.coordinates];
        coordinatesCopy = [updatedMarkerObj.coordinates];
        geometryCopy.coordinates = coordinatesCopy;
        featureCopy.geometry = geometryCopy;
        featuresCopy[idx] = featureCopy;
        featureCollectionCopy.features = featuresCopy;
        reportCopy.featureCollection = featureCollectionCopy;
        this.setState({
            report: reportCopy
        });
    }

    getInitialReportState() {
        if (localStorage.getItem('report')) {
            return JSON.parse(localStorage.getItem('report'));
        } else {
            return this.props.location.state.report
        }
    }

    handleAddFeature = async (newFeature) => {
        newFeature.user = this.props.user;
        newFeature.parentReportId = this.state.report._id;
        const updatedReport = await featuresService.createFeature(newFeature);
        this.setState({ report: updatedReport });
        this.saveStateToLocalStorage(this.state.report);
        this.props.history.push({
            pathname: '/reports/detail',
            state: this.state
        });
    }

    handleAddNote = async (note) => {
        const updatedReport = await notesService.createNote(note);
        this.setState({ report: updatedReport });
        this.saveStateToLocalStorage(this.state.report);
        this.props.history.push({
            pathname: '/reports/detail',
            state: this.state
        });
    }

    handleCancelAddFeature = () => {
        const reportCopy = { ...this.state.report };
        const featureCollectionCopy = { ...reportCopy.featureCollection };
        const featuresCopy = [...featureCollectionCopy.features]
        featuresCopy.pop();
        featureCollectionCopy.features = featuresCopy;
        reportCopy.featureCollection = featureCollectionCopy;
        this.setState({
            report: reportCopy
        });
    }

    handleDeleteNote = async (note) => {
        note.user = this.state.report.user;
        note.reportId = this.state.report._id;
        const updatedReport = await notesService.deleteNote(note);
        this.setState((state) => ({
            report: updatedReport
        }));
        this.saveStateToLocalStorage(this.state.report);
        this.props.history.push({
            pathname: '/reports/detail',
            state: this.state
        });
    }

    handleMoveMarker = (markerId, newLngLat) => {
        const updatedMarkerObj = {
            id: markerId,
            coordinates: [newLngLat.lng, newLngLat.lat]
        };
        this.updatePositionOnState(updatedMarkerObj);
    }

    handleUpdateReport = async () => {
        await reportsService.updateReport(this.state.report);
        this.saveStateToLocalStorage(this.state.report);
    }

    removeStateFromLocalStorage = () => {
        localStorage.removeItem('report');
    }

    resetMarkerPositions = () => {
        this.setState({report: this.props.history.location.state.report});
    }

    saveStateToLocalStorage = (report) => {
        localStorage.setItem('report', JSON.stringify(report))
    }

    sortNotesByDateAscending = () => {
        const reportCopy = { ...this.state.report };
        const notesCopy = [...reportCopy.notes];
        notesCopy.sort(this.props.sortByDateAscending);
        reportCopy.notes = notesCopy;
        this.setState({ report: reportCopy });
    }

    updatePositionOnState = (updatedMarkerObj) => {
        this.state.report.featureCollection.features.forEach((feature, idx) => {
            if (feature._id === updatedMarkerObj.id) {
                this.copyFeatureCollectionAndUpdate(feature, updatedMarkerObj, idx);
            } else if (updatedMarkerObj.id === 'new-marker') {
                const idx = this.state.report.featureCollection.features.length - 1;
                const feature = this.state.report.featureCollection.features[idx];
                this.copyFeatureCollectionAndUpdate(feature, updatedMarkerObj, idx);
            };
        });
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount() {
        this.sortNotesByDateAscending();
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
                                        Detail for reported sighting of 
                                        <Link 
                                            className="ReportShow-emphasized"
                                            to={{
                                                pathname: '/plants/detail',
                                                state: {plant: this.state.report.noxiousSpecies}
                                            }}
                                        >
                                            {this.state.report.noxiousSpecies.commonName}
                                        </Link> on <span className="ReportShow-emphasized">{this.state.report.date.split('T')[0]}</span>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <p>Report created by <span className="ReportShow-emphasized">{this.state.report.user.name}</span></p>
                                    </div>
                                    <div>
                                        {this.state.report.user._id === this.props.user._id ?
                                            <div className="col-sm-12 text-center button-row">
                                                <DeleteModal
                                                    itemData={this.state.report}
                                                    handleDeleteItem={this.props.handleDeleteReport}
                                                    history={this.props.history}
                                                    itemType='report'
                                                    redirectRoute='/reports'
                                                />
                                            </div>
                                            :
                                            <>
                                                <p style={{ color: 'white' }}>obNoxious</p>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MapDisplay
                            addNewMarkerToReport={this.addNewMarkerToReport}
                            handleAddFeature={this.handleAddFeature}
                            handleCancelAddFeature={this.handleCancelAddFeature}
                            handleMoveMarker={this.handleMoveMarker}
                            handleUpdateReport={this.handleUpdateReport}
                            report={this.state.report}
                            resetMarkerPositions={this.resetMarkerPositions}
                            saveStateToLocalStorage={this.saveStateToLocalStorage}
                            type='showReport'
                            user={this.props.user}
                        />
                        <div className="col s12">
                            <div className="card ReportShow-card">
                                <div className="card-content">
                                    <div className="card-title">
                                        Notes:
                                        {this.state.report.user._id === this.props.user._id ?
                                            <div className="col-sm-12 button-row" style={{ display: 'inline' }}>
                                                <AddNoteModal
                                                    refreshReport={this.refreshReport}
                                                    getTodaysDate={this.props.getTodaysDate}
                                                    handleAddNote={this.handleAddNote}
                                                    history={this.props.history}
                                                    report={this.state.report}
                                                    parseDate={this.props.parseDate}
                                                />
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                    <div className="input-field col s12">
                                        {this.state.report.notes.length ?
                                            <>
                                                <p>Notes submitted by {this.state.report.user.name}:</p>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            {this.state.report.user._id === this.props.user._id ?
                                                                <th></th>
                                                                :
                                                                <></>
                                                            }
                                                            <th>Date</th>
                                                            <th>Note</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.report.notes.map((note) =>
                                                            <tr key={note._id}>
                                                                {this.state.report.user._id === this.props.user._id ?
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