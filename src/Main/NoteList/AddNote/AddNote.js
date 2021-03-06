import React from 'react';
import credentials from '../../../config';
import notefulContext from '../../../NotefulContext';
import ValidationError from '../../../ValidationError'
import './AddNote.css';


class AddNote extends React.Component{
    static contextType = notefulContext;

    constructor(props){
        super(props);
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        this.state={
            name: {
                value: '',
                touched: false,
            },
            folderId: {
                value: '',
                touched: false,
            },
            content: {
                value: '',
                touched: false,
            },
            modified: date,
        }
    }



    handleSubmit(e){
        e.preventDefault();
        const details={
            'note_name': this.state.name.value,
            'modified': this.state.modified,
            'folder_id': this.state.folderId.value,
            'content': this.state.content.value,
        };


        fetch(`${credentials.baseUrl}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${credentials.API_KEY}`,
            },
            body: JSON.stringify(details),
        })
        .then(res => {
            if(!res.ok){
                throw new Error();
            }
            return res.json();
        })
        .then(resJson => {
            this.props.addNote(resJson)
            this.props.history.goBack()
        })
        .catch(error => alert(error))
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length===0) {
            return "Name is required"
        } else if (name.length < 3){
            return "Name must be at least 3 characters"
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length===0) {
            return "Content is required"
        } else if (content.length < 15){
            return "Content must be at least 15 characters"
        }
    }

    validateFolder() {
        const folder = this.state.folderId.value;
        if (typeof folder === 'undefined'){
            return "You must pick a valid folder"
        }
    }

    updateName = (name) => {
        this.setState({
            name: {value: name, touched: true}
        });
    }

    updateContent = (content) => {
        this.setState({
            content: {value: content, touched: true}
        });
    }
 
    updateFolderId = (folderName) => {
        let folder = this.context.folders.find(folder => folder.folder_name===folderName);
        this.setState({
            folderId: {value: folder.id, touched: true}
        })
    }

    render(){
        const folders = this.context.folders;
        const nameError = this.validateName();
        const folderError = this.validateFolder();
        const contentError = this.validateContent();

        return(
        <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
            <legend>Add Note</legend>
            <label htmlFor="note-name">Name:</label>
            <input type="text" 
                name="note-name" 
                id="note-name" 
                placeholder="Note Name"
                onChange={e => this.updateName(e.target.value)}
                required
                aria-label="Choose a name for your note"
                aria-required="true"
            />
            {this.state.name.touched &&
            <ValidationError message={nameError} />}
            <label htmlFor="note-folder">Folder:</label>
            <select name="note-folder" 
                    id="note-folder"
                    placeholder="Select Folder"
                    defaultValue=''
                    onChange={e => this.updateFolderId(e.target.value)}
                    required
                    aria-label="Choose note's folder"
                    aria-required="true">
                <option value='' disabled hidden>Choose Here</option>
                {folders.map((folder,i) => 
                    <option key={i} value={folder.name}>{folder.folder_name}</option>
                )}
            </select>
            {this.state.folderId.touched &&
            <ValidationError message={folderError} />}
            <label htmlFor="note-content">Content:</label>
            <textarea 
                name="note-content" 
                id="note-content" 
                onChange={e => this.updateContent(e.target.value)}
                required
                aria-label="Input note's content"
                aria-required="true"
            />
            {this.state.content.touched &&
            <ValidationError message={contentError} />}
            <button 
                type="submit"
                disabled={
                    this.validateName() ||
                    this.validateFolder() ||
                    this.validateContent()
                }>
                Add
            </button>
        </form>
        )
    }
}

export default AddNote;