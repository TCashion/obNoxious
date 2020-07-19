import React, { Component } from 'react';
import M from 'materialize-css';
import './AddNoteModal.css';
import { DatePicker } from 'react-materialize';

class AddNoteModal extends Component {
    state = {
        note: { ...this.getInitialNoteState() }
    }

    getInitialNoteState() {
        return {
            note: '',
            date: this.props.getTodaysDate()
        }
    }

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissable: false,
        }
        M.Modal.init(this.Modal, options)
    }

    handleChange = (e) => {
        e.persist();
        this.setState((state) => ({
            note: {
                ...state.note,
                [e.target.name]: e.target.value
            }
        }));
    }

    handleDateChange = (e) => {
        this.setState((state) => ({
            note: {
                ...state.note,
                date: this.props.parseDate(e)
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('create note: ', this.state.note)

    }

    render() {
        return (
            <div style={{ display: 'inline' }}>
                <a className="waves-effect waves-light btn btn-default modal-trigger" href="#add-note">ADD A NOTE</a>

                <div
                    ref={Modal => { this.Modal = Modal; }}
                    id="add-note"
                    className="modal AddNote-modal"
                >
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal-content">
                            <h5>New note on this report:</h5>
                            <div className="input-field col s12">
                                <label htmlFor="date" className="active">Note date:</label>
                                <DatePicker
                                    defaultValue={this.state.note.date}
                                    id="date"
                                    onChange={this.handleDateChange}
                                />
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="note">Note:</label>
                                <textarea 
                                    id="note" 
                                    name="note" 
                                    className="materialize-textarea" 
                                    defaultValue={this.state.note.note}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="waves-effect waves-green btn btn-default"
                                type="submit"
                            >ADD NOTE</button>
                            <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default AddNoteModal;