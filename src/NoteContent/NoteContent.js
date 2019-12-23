import React from 'react';
import notefulContext from '../NotefulContext'
import './NoteContent.css';

class NoteContent extends React.Component{
    static contextType = notefulContext;


    render(){
        
        let noteContent = this.context.notes.find(note => note.id === this.props.match.params.noteId);

        return(
            <div>
                <section className="note-box">
                    <h3 className="note-name">{typeof noteContent==='undefined'?' ':noteContent.name}</h3>
                    <p className="date-modified">{typeof noteContent==='undefined'?' ':noteContent.modified}</p>
                    <button onClick={() => this.context.deleteNote(typeof noteContent.id==='undefined'?' ':noteContent.id)}>Delete Note</button>
                </section>
                <section className="note-text">
                    <p>
                        {typeof noteContent==='undefined'?' ':noteContent.content}
                    </p>
                </section>
            </div>
        )
    }
}

export default NoteContent;