import React from 'react';
import notefulContext from './NotefulContext'
import './FolderList.css';
import { NavLink } from 'react-router-dom';

class FolderList extends React.Component{
    static contextType = notefulContext;

    render(){
        let folders = this.context.folders.map((folder, id) => (
            <div className="folder-item" key={id}>
                <NavLink 
                    to={`/folder/${folder.id}`}>
                        {folder.name}
                </NavLink>
            </div>
        ));

        return(
            <section className="folder-list">
                {folders}
                <button>Add Folder</button>
            </section>
        )
    }
}

export default FolderList;