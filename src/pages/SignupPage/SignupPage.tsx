import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';

const initialState = {
    message: ''
};

type IProps = {
    handleSignupOrLogin: () => void
};

type IState = Readonly<typeof initialState>;

class SignupPage extends Component <IProps, IState> {

    readonly state: IState = initialState;

    updateMessage = (msg: string) => {
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