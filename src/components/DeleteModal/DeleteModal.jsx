import React, { Component } from 'react';
import M from 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';

class DeleteModal extends Component {
    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissable: false,
        }
        M.Modal.init(this.Modal, options)
    }

    render() {
        return (
            <div style={{display: 'inline'}}>
                <a className="waves-effect waves-light btn btn-danger modal-trigger" href="#delete-this">DELETE</a>

                <div 
                    ref={Modal => {this.Modal = Modal;}}
                    id="delete-this" 
                    className="modal"
                >
                    <div className="modal-content">
                        <h5>Delete report {this.props.reportData._id}?</h5>
                        <p>You won't be able to undo this action.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="waves-effect waves-green btn btn-default">CONFIRM</button>
                        <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default DeleteModal;