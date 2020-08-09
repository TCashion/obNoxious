import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

const initialState = {
    message: ''
};

type IProps = {
    handleSignupOrLogin: () => void
};

type IState = Readonly<typeof initialState>;

class LoginPage extends Component <IProps, IState> {

    readonly state: IState = initialState;

    updateMessage = (msg: string) => {
        this.setState((state) => ({ 
            ...state,
            message: msg 
        }));
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