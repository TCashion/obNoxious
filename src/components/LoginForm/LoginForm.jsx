import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

class LoginForm extends Component {
    state = {
        email: '',
        password: '', 
    }

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push('/');
        } catch (err) {
            this.props.updateMessage('Invalid Credentials')
        }
    }

    validateForm() {
        return !(this.state.email && this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <div className="col-sm-12">
                    <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                </div>
                <div className="col-sm-12">
                    <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="password" onChange={this.handleChange} />
                </div>
                <div className="col-sm-12 text-center">
                    <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
                        <Link to='/'>Cancel</Link>
                </div>
            </form>
        )
    }
}

export default LoginForm;