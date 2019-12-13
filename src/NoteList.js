import React from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';

class NoteList extends React.Component{
    render(){
        const notes = this.props.notes.map((note, id) => (
            <div className="note-box" key={id}>
                <h3 className="note-name"><Link to={`/note/${note.id}`}>{note.name}</Link></h3>
                <p className="date-modified">{note.modified}</p>
                <button>Delete Note</button>
            </div>)
            )
        return(
            <div>
                {notes}
                <button>
                    Add Note
                </button>
            </div>
        )
    }
}

export default NoteList;