import React from 'react';

const notefulContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addNote: () => {},
})

export default notefulContext;