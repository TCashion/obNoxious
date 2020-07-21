import React, { Component } from 'react';
import M from 'materialize-css';

// namespace of data changed to generic 'item' for reusability

class DeleteModal extends Component {
    

    handleConfirmDelete = () => {
        this.props.handleDeleteItem(this.props.itemData);
        this.props.history.push(this.props.redirectRoute);
    }

    /* ---------- Lifecycle methods ---------- */

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
                        <h5>Delete this {this.props.itemType}?</h5>
                        <p>You won't be able to undo this action.</p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            className="waves-effect waves-green btn btn-default"
                            onClick={this.handleConfirmDelete}
                        >CONFIRM</button>
                        <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default DeleteModal;