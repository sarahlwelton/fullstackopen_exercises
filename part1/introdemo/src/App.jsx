// Introduce state to the App
import { useState } from 'react'

// Use destructuring to access only counter, use arrow function to display its value
const Display = ({ counter }) => <div>{counter}</div>

// Use destructuring to get at the values of onClick and text right away, use an arrow function to 
// simply render a button
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // Define counter and setCounter as states that start at 0
  const [counter, setCounter] = useState(0)

  console.log('rendering with counter value', counter)

  const increaseByOne = () => {

    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 

    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {

    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  )
} 
export default App