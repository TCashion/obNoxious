import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReportIndexPage extends Component {
    state = {
        showUserReportsOrAllReports: [1, 0], 
        reports:  []
    }

    async getReports() {
        const reports = await this.props.getAllReports();   
        this.setState({
            reports
        })
    }

    componentDidMount() {
        this.getReports(); 
    }

    render() {
        return(
            <>
            <div className="row row-center-card">
                <div className="col s12 m10">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                <h5>User Reports:</h5>
                            </div>
                            <div>
                                <table className="centered">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Reported Species</th>
                                            <th>Report Creator</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.reports.map((report) =>
                                            <tr key={report._id}>
                                                <td><Link 
                                                    to={{
                                                        pathname: '/reports/detail',
                                                        state: {report}
                                                    }}
                                                    >{report.date}</ Link></td>
                                                <td>{report.noxiousSpecies ? report.noxiousSpecies.commonName : 'undefined'}</td>
                                                <td>{report.user.name}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default ReportIndexPage;