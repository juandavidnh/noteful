import React from 'react';
import notefulContext from '../../NotefulContext';
import { Link } from 'react-router-dom';
import './NoteList.css';

class NoteList extends React.Component{
    static contextType = notefulContext;

    convertDate = (date) => {
        let oldDate = new Date(date);
        let year =  oldDate.getFullYear();
        let month = oldDate.toLocaleString('default', {month: 'long'});
        let day = oldDate.getDate();
        let newDate = month + ' ' + day +', ' + year;

        return newDate; 
    }

    render(){
        const filteredNotes = (typeof this.props.match.params.folderId !== 'undefined' ? this.context.notes.filter(note => parseInt(note.folder_id) === parseInt(this.props.match.params.folderId)):this.context.notes )
        const formattedNotes = filteredNotes.map((note, id) => (
            <div className="note-box" key={id} >
                <h3 className="note-name"><Link to={`/note/${note.id}`} tabIndex={4}>{note.note_name}</Link></h3>
                <p className="date-modified">{this.convertDate(note.modified)}</p>
                <button onClick={() => this.context.deleteNote(note.id)}>Delete Note</button>
            </div>)
            )
           
        return(
            <div>
                {formattedNotes}
                <div className="button" role="button" aria-pressed="false" >
                <Link to="/add-note" tabIndex={1}>
                    Add Note
                </Link>
                </div>
            </div>
        )
    }
}

export default NoteList;