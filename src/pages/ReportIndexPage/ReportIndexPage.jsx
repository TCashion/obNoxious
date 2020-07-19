import React, { Component } from 'react';

class ReportIndexPage extends Component {
    state = {
        showUserReportsOrAllReports: [1, 0]
    }

    getReports = () => {
        const reports = this.state.showUserReportsOrAllReports[0] === 1 ? 'user' : 'all'
        this.setState({
            reports
        })
    }

    componentDidMount = () => {
        this.getReports(); 
    }

    render() {
        return(
            <h1>ReportIndexPage</h1>
        )
    }
}

export default ReportIndexPage;