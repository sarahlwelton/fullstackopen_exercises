import React from 'react'
import ReactDOM from 'react-dom/client'

// Now, we're going to use the Redux Toolkit instead of just Redux.
import { configureStore } from '@reduxjs/toolkit'

// Now that we have 2 reducers, we need to use combineReducers
//import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
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

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// Move App into its own file

// Now, instead of App having to pass store as props to all of those components,
// the store Provider wraps the App component and makes the store directly
// accessible to all components without explicitly being passed
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)