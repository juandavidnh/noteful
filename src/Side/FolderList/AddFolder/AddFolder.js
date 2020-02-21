import React from 'react';
import notefulContext from '../../../NotefulContext';
import credentials from '../../../config';
import ValidationError from '../../../ValidationError'
import { createBrowserHistory } from 'history';
import './AddFolder.css'

class AddFolder extends React.Component{
    static contextType = notefulContext;

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const history = createBrowserHistory();
        const details={
            'folder_name': this.state.name.value,
        };

        fetch(`${credentials.baseUrl}/folders`, {
            method: "POST",
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
        .then(resJson => this.context.folders.push(resJson))
        .then(history.push('/'))
        .then(window.location.reload())
        .catch(error => alert(error))
    }

    newName = (name) => {
        this.setState({
            name: {value: name, touched: true}
        });
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length===0) {
            return "Name is required"
        } else if (name.length < 3){
            return "Name must be at least 3 characters"
        }
    }

    render() {
        const nameError = this.validateName();

        return(
        <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
            <legend>Add Folder</legend>
            <label htmlFor="folder-name">Folder Name:</label>
            <input type="text" 
                name="folder-name" 
                id="folder-name" 
                placeholder="New Folder"
                onChange={e => this.newName(e.target.value)}
                required
                aria-label="Name of new folder"
                aria-required="true"
                />
            {this.state.name.touched &&
            <ValidationError message={nameError}/>}
            <button 
                type="submit"
                disabled={this.validateName()}>Add</button>
        </form>
        )
    }
}

export default AddFolder