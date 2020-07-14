import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginPage extends Component {

    state = {
        message: '',
    }

    updateMessage = (msg) => {
        this.setState({ message: msg });
    }

    render() {
        return (
            <div>
                <LoginForm 
                    {...this.props}
                    updateMessage={this.updateMessage} 
                    handleSignupOrLogin={this.props.handleSignupOrLogin} 
                />
            </div>
        )
    }
}

export default LoginPage;