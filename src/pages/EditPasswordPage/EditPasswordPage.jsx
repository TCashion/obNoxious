import React, { Component } from 'react';
import EditPasswordForm from '../../components/EditPasswordForm/EditPasswordForm';

class EditPasswordPage extends Component {
    state = {
        msg: '',
    }

    updateMessage = (msg) => {
        this.setState({ message: msg });
    }

    render() {
        return (
            <>
                <EditPasswordForm 
                    {...this.props}
                    user={this.props.user}
                    updateMessage={this.updateMessage}
                />
                <p>{this.state.msg}</p>
            </>
        )
    }
}

export default EditPasswordPage;