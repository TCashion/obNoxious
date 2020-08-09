import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <>
                <div>
                    <SignupForm
                        {...this.props}
                        updateMessage={this.updateMessage}
                        handleSignupOrLogin={this.props.handleSignupOrLogin} 
                    />
                </div>
                <p>Already registered? <Link to='/login'>Log In</Link></p>
            </>
        )
    }
}

export default SignupPage;