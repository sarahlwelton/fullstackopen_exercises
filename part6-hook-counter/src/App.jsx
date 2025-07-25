//import { useReducer, useContext } from 'react'
// Let's create a context in the app to store the state management of the counter
//import CounterContext from './CounterContext'

import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App

// Reducer function that handles state changes is similar to Redux reducers

// But we move this into the CounterContext file to clean up App.jsx.
/*const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}*/

// By adding the CounterContext.Provider in the App component, we can access the context with useContext
/*const Display = () => {
  const [counter] = useContext(CounterContext)
  return <div>{counter}</div>
}

const Button = ({ type, label }) => {
  const [counter, dispatch] = useContext(CounterContext)
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}*/

// The useReducer hook provides a mechanism to create state for an app 
// The parameter for creating a state is the reducer function that handles state changes, and the initial state value

// The useReducer function returns an array that contains an element to access the current value of the state (counter) and a dispatch function (counterDispatch) to change the state
/*const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </CounterContext.Provider>
  )
}

export default App*/