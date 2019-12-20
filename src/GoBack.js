import React from 'react';
import notefulContext from './NotefulContext'
import { Link } from 'react-router-dom';
import './GoBack.css';

class GoBack extends React.Component{
    static contextType = notefulContext; 

    render(){
        const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
        const folder = this.context.folders.find(folder => folder.id === note.folderId);
        return(
            <div className="go-back">
                <div className="folder-item">
                    <Link to={`/folder/${folder.id}`}>Go back</Link>
                </div>
                <h3>{folder.name}</h3>
            </div>
        )
    }
}

export default GoBack;