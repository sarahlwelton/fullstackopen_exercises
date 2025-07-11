import React from 'react'
import ReactDOM from 'react-dom/client'

// Now, we're going to use the Redux Toolkit instead of just Redux.
import { configureStore } from '@reduxjs/toolkit'

// Now that we have 2 reducers, we need to use combineReducers
//import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import store from './store'

import App from './App'
// import noteService from './services/notes'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'



/*
// We define our reducer for the app as a combined reducer
const reducer = combineReducers({
  // We define the value of the notes property of the store with noteReducer
  notes: noteReducer,
  // We define the value of the filter property of the store with filterReducer
  filter: filterReducer

  // Every action gets handled in every part of the combined reducer - every reducer 
  // "listens" to all of the dispatch actions, and does something if it is instructed to do so
}) */

//const store = createStore(reducer)

/* const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
}) */

// Initialize the notes state based on the data received from the server - fetch the notes
// and dispatch an action using appendNote for each individual note object
/* noteService.getAll().then(notes =>
  notes.forEach(note => {
    store.dispatch(appendNote(note))
  })
) */
// But this is a little messy - dispatching multiple actions is impractical

// Await only works inside async functions - code in here is not inside a function, so 
// we'll avoid using async

// But now, we'll move this to the App component
/* noteService.getAll().then(notes =>
  store.dispatch(setNotes(notes))
) */

// Move App into its own file

// Now, instead of App having to pass store as props to all of those components,
// the store Provider wraps the App component and makes the store directly
// accessible to all components without explicitly being passed
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)