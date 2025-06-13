import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

// Move App into its own file

// Now, instead of App having to pass store as props to all of those components,
// the store Provider wraps the App component and makes the store directly
// accessible to all components without explicitly being passed
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)