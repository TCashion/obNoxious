import React, { Component } from 'react';
import userService from '../../services/userService';

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
            <div className="row row-user-form">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                CREATE YOUR ACCOUNT:
                            </div>
                            <div>
                                <form className="user-form" onSubmit={this.handleSubmit}>
                                    <div className="col-sm-12">
                                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12">
                                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12">
                                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12">
                                        <input type="password" name="passwordConf" placeholder="Confirm Password" value={this.state.passwordConf} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12">
                                        <button className="btn btn-default" type="submit" disabled={this.validateForm()}>CREATE ACCOUNT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupForm;