import React from 'react';
import { Route, Link } from 'react-router-dom';
import FolderList from './FolderList';
import NoteContent from './NoteContent';
import NoteList from './NoteList';
import GoBack from './GoBack';
import STORE from './dummy-store';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      store: STORE,
    }
  }

  render(){return (
  <>
    <header>
        <h1><Link to="/">Noteful</Link></h1>
    </header>
    <main className='App'>
      <section className='SideBar'>
        <Route 
          exact
          path='/'
          render={()=>
          <FolderList 
            folders={this.state.store.folders}
          />}
        />
        <Route
          path='/folder/:folderId'
          
          render={() =>
          <FolderList
            folders={this.state.store.folders}
          />}
        />
        <Route 
          path='/note/:noteId'
          render={(routerProps) => 
            <GoBack
              store={this.state.store}
              note={this.state.store.notes.filter(note => note.id === routerProps.match.params.noteId)} 
            />}
        />
      </section>
      <section className='Main'>
        <Route 
          exact
          path='/'
          render={() =>
          <NoteList 
            notes={this.state.store.notes}
          />}
        />
        <Route 
          path='/folder/:folderId'
          render={(routerProps) =>
            <NoteList 
              notes={this.state.store.notes.filter(note => note.folderId === routerProps.match.params.folderId)}
            />}
        />
        <Route 
          path='/note/:noteId'
          render={(routerProps) =>
            <NoteContent
              note={this.state.store.notes.find(note => note.id === routerProps.match.params.noteId)} 
            />}
        />
      </section>
    </main>
  </>
  );
  }
}

export default App;

