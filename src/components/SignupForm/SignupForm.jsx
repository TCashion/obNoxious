import React, { Component } from 'react';
import userService from '../../services/userService';
import './SignupForm.css';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    }

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push('/');
        } catch (err) {
            this.props.updateMessage(err.message)
        }
    }

    validateForm() {
        return !(this.state.name && this.state.email && this.state.password && this.state.password === this.state.passwordConf);
    }

    render() {
        return ( 
            <>
                <form className="user-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <input type="text" name="passwordConf" placeholder="Confirm Password" value={this.state.passwordConf} onChange={this.handleChange} />
                    <button type="submit" disabled={this.validateForm()}>CREATE ACCOUNT</button>
                </form>
            </>
        );
    }
}

export default SignupForm;