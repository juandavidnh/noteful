import React from 'react';
import { Route, Link } from 'react-router-dom';
import notefulContext from './NotefulContext';
import FolderList from './FolderList';
import NoteContent from './NoteContent';
import NoteList from './NoteList';
import GoBack from './GoBack';
import './App.css';


class App extends React.Component {  
  constructor(props){
    super(props);
    this.state={
      folders: [],
      notes: [],
    }
  }

  componentDidMount(){
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => this.setState({folders: data}))
    .catch(error => {alert(error.message)});

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => this.setState({notes: data}))
    .catch(error => {alert(error.message)})
  }

  deleteNote = (noteId) => {

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(document.location.reload())
  }

  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
    }
  
    return (
    <>
    <header>
        <h1><Link to="/">Noteful</Link></h1>
    </header>
    <notefulContext.Provider value={contextValue}>
    <main className='App'>
      <section className='SideBar'>
        <Route 
          exact
          path='/'
          component={FolderList}
        />
        <Route
          path='/folder/:folderId'
          component={FolderList}
        />
        <Route 
          path='/note/:noteId'
          component={GoBack}
        />
      </section>
      <section className='Main'>
        <Route 
          exact
          path='/'
          component={NoteList}
        />
        <Route 
          path='/folder/:folderId'
          component={NoteList}
        />
        <Route 
          path='/note/:noteId'
          component={NoteContent}
        />
      </section>
    </main>
    </notefulContext.Provider>
    </>
  );
  }
}

export default App;

