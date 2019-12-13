import React from 'react';
import { Link } from 'react-router-dom';
import './GoBack.css';

class GoBack extends React.Component{
    render(){
        const note = this.props.note;
        const folderId = note[0].folderId;
        const store = this.props.store;
        const folder = store.folders.find(folder => folder.id === note[0].folderId)
        return(
            <div className="go-back">
                <div className="folder-item">
                    <Link to={`/folder/${folderId}`}>Go back</Link>
                </div>
                <h3>{folder.name}</h3>
            </div>
        )
    }
}

export default GoBack;