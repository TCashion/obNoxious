import React, { Component } from 'react';
import './ReportShowPage.css';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import AddNoteModal from '../../components/AddNoteModal/AddNoteModal';

class ReportShowPage extends Component {
    state = {
        reportData: this.props.location.state.report
    }

    handleAddNoteClick = () => {
        console.log('click')
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
                                                <button className="btn btn-default">EDIT</button>
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
                                    </div>
                                    <div className="input-field col s12">
                                        {this.state.reportData.notes.length ?
                                            <p>Got some notes, yet.</p>
                                            :
                                            <>
                                                <h6 className="left-align" style={{display: 'inline'}}>No notes, yet.</h6>
                                                {this.state.reportData.user._id === this.props.user._id ?
                                                    <div className="col-sm-12 button-row" style={{display: 'inline'}}>
                                                        <AddNoteModal
                                                            getTodaysDate={this.props.getTodaysDate}
                                                            reportData={this.state.reportData}
                                                            parseDate={this.props.parseDate}
                                                            history={this.props.history}
                                                        />
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </>
                                        }
                                    </div>
                                    <div>
                                        Notes
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