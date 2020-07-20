import React, { Component } from 'react';
import M from 'materialize-css';

class DeleteNoteModal extends Component {
    modalId = `#delete-note/${this.props.note._id}`

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissable: false,
        }
        M.Modal.init(this.Modal, options)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.handleDeleteNote(this.props.note);
    }

    render() {
        return (
            <div style={{ display: 'inline' }}>
                <a className="waves-effect waves-light btn-flat modal-trigger" data-target={this.modalId}>X</a>

                <div
                    ref={Modal => { this.Modal = Modal; }}
                    id={this.modalId}
                    className="modal"
                >
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal-content">
                            <h5>Are you sure you want to delete this note?</h5>
                            <p>body: {this.props.note.body}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="waves-effect waves-green btn btn-default"
                                type="submit"
                            >CONFIRM</button>
                            <button 
                                type="button"
                                className="modal-close waves-effect waves-green btn-flat"
                            >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default DeleteNoteModal;