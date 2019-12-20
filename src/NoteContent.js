import React from 'react';
import notefulContext from './NotefulContext'
import './NoteContent.css';

class NoteContent extends React.Component{
    static contextType = notefulContext;


    render(){
        
        let noteContent = this.context.notes.find(note => note.id === this.props.match.params.noteId);

        return(
            <div>
                <section className="note-box">
                    <h3 className="note-name">{noteContent.name}</h3>
                    <p className="date-modified">{noteContent.modified}</p>
                </section>
                <section className="note-text">
                    <p>
                        {noteContent.content}
                    </p>
                </section>
            </div>
        )
    }
}

export default NoteContent;