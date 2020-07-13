import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

class SignupPage extends Component {
    
    state = {
        message: '',
    }

    updateMessage = (msg) => {
        this.setState({ message: msg });
    }

    render() {
        return (
            <div>
                <SignupForm {...this.props} updateMessage={this.updateMessage} />
            </div>
        )
    }
}

export default SignupPage;