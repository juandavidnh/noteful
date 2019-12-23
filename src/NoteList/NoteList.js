import React from 'react';
import notefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
import './NoteList.css';

class NoteList extends React.Component{
    static contextType = notefulContext;

    render(){

        const filteredNotes = (typeof this.props.match.params.folderId !== 'undefined' ? this.context.notes.filter(note => note.folderId === this.props.match.params.folderId):this.context.notes )
        const formattedNotes = filteredNotes.map((note, id) => (
            <div className="note-box" key={id}>
                <h3 className="note-name"><Link to={`/note/${note.id}`}>{note.name}</Link></h3>
                <p className="date-modified">{note.modified}</p>
                <button onClick={() => this.context.deleteNote(note.id)}>Delete Note</button>
            </div>)
            )
        return(
            <div>
                {formattedNotes}
                <Link to="/add-note">
                    Add Note
                </Link>
            </div>
        )
    }
}

export default NoteList;