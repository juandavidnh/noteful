import React from 'react';
import notefulContext from '../../NotefulContext'
import { Link } from 'react-router-dom';
import './GoBack.css';

class GoBack extends React.Component{
    static contextType = notefulContext; 

    render(){
        const note = this.context.notes.find(note => parseInt(note.id) === parseInt(this.props.match.params.noteId));
        const folder = typeof note === 'undefined' ? null : this.context.folders.find(folder => parseInt(folder.id) === parseInt(note.folder_id));
        return(
            <section className="go-back">
                <div className="folder-item">
                    <Link to={`/folder/${folder===null?' ':folder.id}`}>Go back</Link>
                </div>
                <h3>{folder===null?' ':folder.name}</h3>
            </section>
        )
    }
}

export default GoBack;