import React from 'react';
import notefulContext from '../../NotefulContext'
import './NoteContent.css';

class NoteContent extends React.Component{
    static contextType = notefulContext;
    
    static defaultProps ={
        note:{
            id: '',
            name: '',
            modified: '',
            content: '',
        }
    }

    render(){
        const note= this.props.note;
        return(
            <div>
                <section className="note-box">
                    <h3 className="note-name">{typeof note==='undefined'?' ':note.note_name}</h3>
                    <p className="date-modified">{typeof note==='undefined'?' ':note.modified}</p>
                    <button onClick={() => this.context.deleteNote(typeof note.id==='undefined'?' ':note.id)}>Delete Note</button>
                </section>
                <section className="note-text">
                    <p>
                        {typeof note==='undefined'?' ':note.content}
                    </p>
                </section>
            </div>
        )
    }
}

export default NoteContent;