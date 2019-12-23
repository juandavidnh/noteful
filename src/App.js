import React from 'react';
import { Route, Link } from 'react-router-dom';
import credentials from './config'
import notefulContext from './NotefulContext';
import FolderList from './FolderList/FolderList';
import NoteContent from './NoteContent/NoteContent';
import NoteList from './NoteList/NoteList';
import GoBack from './GoBack/GoBack';
import AddFolder from './FolderList/AddFolder/AddFolder';
import AddFile from './NoteList/AddFile/AddFile';
import './App.css';
import { createBrowserHistory } from 'history';

class App extends React.Component {  
  constructor(props){
    super(props);
    this.state={
      folders: [],
      notes: [],
    }
  }

  componentDidMount(){
    fetch(`${credentials.baseUrl}/folders`, {
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

    fetch(`${credentials.baseUrl}/notes`, {
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
    const history = createBrowserHistory();

    fetch(`${credentials.baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    /*.then(res => {
      if(!res.ok){
        throw new Error()
      }
      return res.json();
    })*/
    .then(history.push('/'))
    .then(window.location.reload())
    //.catch(error => alert(error.message))
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
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddFile}
        />
      </section>
    </main>
    </notefulContext.Provider>
    </>
  );
  }
}

export default App;

