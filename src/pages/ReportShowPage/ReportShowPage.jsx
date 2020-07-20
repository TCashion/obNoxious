import React, { Component } from 'react';
import './ReportShowPage.css';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import AddNoteModal from '../../components/AddNoteModal/AddNoteModal';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';
import notesService from '../../services/notesService';

class ReportShowPage extends Component {
    state = {
        reportData: this.props.location.state.report
    }

    componentDidMount() {
        this.sortNotesByDateAscending();
    }

    handleAddNote = async (note) => {
        const updatedReport = await notesService.createNote(note);
        this.setState((state) => ({
            reportData: updatedReport
        }));
    }

    handleDeleteNote = async (note) => {
        note.user=this.state.reportData.user;
        note.reportId=this.state.reportData._id;
        const updatedReport = await notesService.deleteNote(note);
        this.setState((state) => ({
            reportData: updatedReport
        }));
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