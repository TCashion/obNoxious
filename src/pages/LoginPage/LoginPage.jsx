import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <>
                <div>
                    <LoginForm 
                        {...this.props}
                        updateMessage={this.updateMessage} 
                        handleSignupOrLogin={this.props.handleSignupOrLogin} 
                    />
                    <p>
                        {this.state.message}
                    </p>
                </div>
                <p>No account yet? <Link to='/signup'>Sign Up</Link></p>
            </>
        )
    }
}

export default LoginPage;