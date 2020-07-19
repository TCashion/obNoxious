import React, { Component } from 'react';
import './ReportShowPage.css';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

class ReportShowPage extends Component {
    state = {
        reportData: this.props.location.state.report
    }

    render() {
        return (
            <>
                <div className="show-container">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-title">
                                        Detail for reported sighting of <span className="emphasized">{this.state.reportData.noxiousSpecies.commonName}</span> on <span className="emphasized">{this.state.reportData.date.split('T')[0]}</span>
                                    </div>
                                    <div className="input-field col s12 left-align">
                                        <p>Report created by <span className="emphasized">{this.state.reportData.user.name}</span></p>
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
                    </div>
                </div>
            </>
        )
    }
}

export default ReportShowPage;