//import { useContext } from 'react'
//import CounterContext from '../CounterContext'

// Now, the entire state and the code for managing it, lives in CounterContext
// The CounterContext also contains auxiliary functions for managing the state
import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

// Button only needs the dispatch function, but it also gets the value of the counter from the context
// We can make this easier and cleaner. 
/*const Button = ({ type, label }) => {
  const [counter, dispatch] = useContext(CounterContext)
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}*/

export default Button