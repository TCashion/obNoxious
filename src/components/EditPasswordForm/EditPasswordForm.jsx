import React, { Component } from 'react';
import userService from '../../services/userService';

class EditPasswordForm extends Component {
    state = {
        email: this.props.user.email,
        password: '',
        newPassword: '',
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
            await userService.updatePassword(this.state);
        //     // this.props.history.push('/');
        } catch (err) {
            this.props.updateMessage(err.message)
        }
    }

    validateForm() {
        return !(this.state.password && this.state.newPassword === this.state.passwordConf);
    }

    render() {
        return (
            <div className="row row-user-form">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                UPDATE PASSWORD:
                            </div>
                            <div>
                                <form className="user-form" onSubmit={this.handleSubmit}>
                                    <div className="input-field col-sm-12">
                                        <label htmlFor="password" className="active">Current password: </label>
                                        <input type="password" name="password" minLength="6" value={this.state.existing} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col-sm-12">
                                        <label htmlFor="newPassword" className="active">New password: </label>
                                        <input type="password" name="newPassword" minLength="6" value={this.state.newPassword} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col-sm-12">
                                        <label htmlFor="passwordConf" className="active">Confirm new password: </label>
                                        <input type="password" name="passwordConf" minLength="6" value={this.state.passwordConf} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12">
                                        <button className="btn btn-default" type="submit" disabled={this.validateForm()}>UPDATE</button>
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

export default EditPasswordForm;