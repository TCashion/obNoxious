import React, { Component } from 'react';
import M from 'materialize-css';
import './AddNoteModal.css';
import { DatePicker } from 'react-materialize';

class AddNoteModal extends Component {
    state = {
        note: { ...this.getInitialNoteState() }, 
        currentDate: this.props.parseDate(new Date())
    }

    getInitialNoteState() {
        return {
            user: this.props.reportData.user,
            parentReportId: this.props.reportData._id,
            note: '',
            date: this.props.getTodaysDate()
        }
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

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.handleAddNote(this.state.note);
        this.resetModalState();
        M.Modal.getInstance(this.Modal).close();
    }

    resetModalState = () => {
        this.setState({note: {...this.getInitialNoteState()}})
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
            <div style={{ display: 'inline' }}>
                <a className="waves-effect waves-light btn btn-default AddNote-btn modal-trigger" href="#add-note">ADD A NOTE</a>

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
                                    value={this.state.note.note}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="waves-effect waves-green btn btn-default"
                                type="submit"
                            >ADD NOTE</button>
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


export default AddNoteModal;