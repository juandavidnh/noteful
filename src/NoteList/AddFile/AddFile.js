import React from 'react';
import {createBrowserHistory} from 'history';
import credentials from '../../config';
import notefulContext from '../../NotefulContext';
import './AddFile.css';

class AddFile extends React.Component{
    static contextType = notefulContext;

    constructor(props){
        super(props);
        this.state={
            name: '',
            modified: '',
            folderId: '',
            content: '',
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const history = createBrowserHistory();
        const data = [];
        const details={
            'name': this.state.name,
            'modified': this.state.modified,
            'folderId': this.state.folderId,
            'content': this.state.content,
        };
         
        for(let property in details){
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            data.push(encodedKey + "=" + encodedValue);
        }

        fetch(`${credentials.baseUrl}/notes`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: data.join('&'),
        })
        .then(res => {
            if(!res.ok){
                throw new Error();
            }
            return res.json();
        })
        .then(history.push('/'))
        .then(window.location.reload())
        .catch(error => alert(error))
    }

    updateName = (name) => {
        this.setState({name: name});
    }

    updateDate = (date) => {
        this.setState({modified: date});
    }

    updateContent = (content) => {
        this.setState({content: content});
    }
 
    updateFolderId = (folderName) => {
        let folder = this.context.folders.find(folder => folder.name===folderName);
        this.setState({folderId: folder.id})
    }

    render(){
        const folders = this.context.folders;

        return(
        <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
            <legend>Add Note</legend>
            <label htmlFor="note-name">Name:</label>
            <input type="text" 
                name="note-name" 
                id="note-name" 
                defaultValue="New Note"
                onChange={e => this.updateName(e.target.value)}
            />
            <label htmlFor="note-date">Date:</label>
            <input type="date" 
                    name="note-date" 
                    id="note-date" 
                    onChange={e => this.updateDate(e.target.value)}
            />
            <label htmlFor="note-folder">Folder:</label>
            <select name="note-folder" 
                    id="note-folder"
                    onChange={e => this.updateFolderId(e.target.value)}>
                {folders.map((folder,i) => 
                    <option key={i} value={folder.name}>{folder.name}</option>
                )}
            </select>
            <label htmlFor="note-content">Content:</label>
            <textarea 
                name="note-content" 
                id="note-content" 
                onChange={e => this.updateContent(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
        )
    }
}

export default AddFile;