import React from 'react';
import './NoteContent.css';

class NoteContent extends React.Component{
    render(){
        const noteContent = this.props.note;

        return(
            <div>
                <section className="note-box">
                    <h3 className="note-name">{noteContent.name}</h3>
                    <p className="date-modified">{noteContent.modified}</p>
                    <button>Delete Note</button>
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