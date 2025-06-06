import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { noteReducer } from '../reducers/noteReducer'

// This new reducer sets state to an array
// The NEW_NOTE action adds notes to the state array with state.push
// BUT THIS IS BAD. This changes the state of the state-object. 
// We should use concat instead, to create a new array. 
/* const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload)
    return state
  }

  return state
} */

const store = createStore(noteReducer)

// Actions need two fields: 
// Type = set the type of action
// Payload = set the data that needs to be included with the action
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
export default App;