import React, { Component, FormEvent } from 'react';
import userService from '../../services/userService';

const initialState = {
    formData: {
        email: '',
        password: '',
        newPassword: '',
        passwordConf: '',
        message: ''
    }
};

type IProps = {
    user: {
        _id: string,
        email: string
    }
}

type IState = Readonly<typeof initialState>;

class EditPasswordForm extends Component <IProps, IState> {
    // state = {
    //     formData: { ...this.getInitialFormData() }
    // }
    readonly state: IState = initialState;

    getInitialFormData() {
        return {
            email: this.props.user.email,
            password: '',
            newPassword: '',
            passwordConf: '',
            message: ''
        }
    }

    handleChange = (e: FormEvent<HTMLInputElement>): void => {
        e.persist()
        this.updateMessage('');
        this.setState((state) => ({
            formData: {
                ...this.state.formData,
                [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
            }
        }))
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await userService.updatePassword(this.state.formData);
            this.updateMessage('Password change successful.');
            this.setState({
                formData: { ...this.getInitialFormData() }
            })
        } catch (err) {
            this.updateMessage(err.message)
        }
    }

    updateMessage = (msg: string) => {
        this.setState((state) => ({
            ...state,
            message: msg
        }));
    }

    validateForm() {
        return !(this.state.formData.password && this.state.formData.newPassword === this.state.formData.passwordConf);
    }

    /* ---------- Lifecycle methods ---------- */

    componentDidMount = () => {
        this.getInitialFormData();
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
                                        <input type="password" name="password" minLength={6} value={this.state.formData.password} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col-sm-12">
                                        <label htmlFor="newPassword" className="active">New password: </label>
                                        <input type="password" name="newPassword" minLength={6} value={this.state.formData.newPassword} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col-sm-12">
                                        <label htmlFor="passwordConf" className="active">Confirm new password: </label>
                                        <input type="password" name="passwordConf" minLength={6} value={this.state.formData.passwordConf} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-sm-12">
                                        {this.state.formData.message ?
                                            <p style={{ color: 'green' }}>{this.state.formData.message}</p>
                                            :
                                            <button className="btn btn-default" type="submit" disabled={this.validateForm()}>UPDATE</button>
                                        }
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