import React from 'react';
import { Route, Link } from 'react-router-dom';
import credentials from './config';
import notefulContext from './NotefulContext';
import FolderList from './Side/FolderList/FolderList';
import NoteContent from './Main/NoteContent/NoteContent';
import NoteList from './Main/NoteList/NoteList';
import GoBack from './Side/GoBack/GoBack';
import AddFolder from './Side/FolderList/AddFolder/AddFolder';
import AddNote from './Main/NoteList/AddNote/AddNote';
import NotefulError from './NotefulError'
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
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.API_KEY}`,
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
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.API_KEY}`,
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
    console.log(noteId)
    const noteIdInt = noteId;

    fetch(`${credentials.baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.API_KEY}`,
      },
    })
    .then(() => {
      console.log(noteIdInt)
      const newNotes = this.state.notes.filter(note => 
        note.id!==noteIdInt
      )
      console.log(newNotes)
      this.setState({
        notes: newNotes
      })
    })
    .catch(error => alert(error.message))
  }

  addFolder = (newFolder) => {
    let folderArrayCopy = this.state.folders;
    folderArrayCopy.push(newFolder);

    this.setState({
      folders: folderArrayCopy
    })
  }

  addNote = (newNote) => {
    let noteArrayCopy = this.state.notes;
    noteArrayCopy.push(newNote);

    this.setState({
      notes: noteArrayCopy
    })
  }

  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote
    }

    const browserHistory = createBrowserHistory();
  
    return (
    <>
    <header>
        <h1><Link to="/">Noteful</Link></h1>
    </header>
    <notefulContext.Provider value={contextValue}>
    <main className='App'>
      <NotefulError>
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
      </NotefulError>
      <NotefulError>
      <section className='Main'>
        <Route 
          exact
          path='/'
          component = {NoteList}
        />
        <Route 
          path='/folder/:folderId'
          component = {NoteList}
        />
        <Route 
          path='/note/:noteId'
          render={(props) => 
            <NoteContent 
              note = {contextValue.notes.find(note => parseInt(note.id) === parseInt(props.match.params.noteId))}
              />}
        />
        <Route
          path='/add-folder'
          render = {(history) => 
            <AddFolder 
              addFolder = {this.addFolder}
              history = {browserHistory}/>}
        />
        <Route
          path='/add-note'
          render = {(history) => 
          <AddNote 
            addNote = {this.addNote}
            history = {browserHistory}/>}
        />
      </section>
      </NotefulError>
    </main>
    </notefulContext.Provider>
    </>
  );
  }
}

export default App;

