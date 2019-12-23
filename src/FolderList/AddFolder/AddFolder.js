import React from 'react';
import notefulContext from '../../NotefulContext';
import credentials from '../../config';
import { createBrowserHistory } from 'history';
import './AddFolder.css'

class AddFolder extends React.Component{
    static contextType = notefulContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const history = createBrowserHistory();
        const data = [];
        const details={
            'name': this.state.name,
        };
         
        for(let property in details){
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            data.push(encodedKey + "=" + encodedValue);
        }

        fetch(`${credentials.baseUrl}/folders`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: data,
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

    newName = (name) => {
        this.setState({name: name});
    }

    render() {
        return(
        <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
            <legend>Add Folder</legend>
            <label htmlFor="folder-name">Folder Name:</label>
            <input type="text" 
                name="folder-name" 
                id="folder-name" 
                defaultValue="New Folder"
                onChange={e => this.newName(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
        )
    }
}

export default AddFolder