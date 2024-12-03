import { useState } from 'react'

/* 
// This uses one piece of state for the entire application, both `left` and `right`, in a single object
// Note that it would be better to use 2 seperate pieces of state instead.

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  // We can do it this way, but it's a little messy. 

    const handleLeftClick = () => {
      const newClicks = { 
        left: clicks.left + 1, 
        right: clicks.right 
      }
      setClicks(newClicks)
    }

  // To clean it up, we use the object spread syntax to create a new object that contains both `left` and `right` and assign the new value of `left`.
  // We also stop assigning the object to a variable in the event handler. 

  const handleLeftClick = () =>
    setClicks({ ...clicks, left: clicks.left + 1 })

    const handleLeftClick = () => {
      clicks.left++
      setClicks(clicks)
    } 

    // WE CANNOT DO THIS. 
    // Changing the state directly can lead to unintended side effects.
    // Always copy the properties into a new object to change state. 

  
  const handleRightClick = () =>
    setClicks({ ...clicks, right: clicks.right + 1 })

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
*/

/*
// Create a new component to render the click history
const History = (props) => {
  // If the array for allClicks is empty, display instructions
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  // If the array for allClicks is not empty, display the click history
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


// Define a new Button component instead of using a <button> element in the App component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

/* Need to debug? 

// Expand out the Button definition to log props without destructuring to the console, to make sure things appear as expected
const Button = (props) => { 

  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// Always separate things you want to log to the console with a comma (,) - not a + 
*/ 

/*
const App = () => {
  // Never define state inside of a loop, conditional, or any place that is not a function defining a component
  // Otherwise, your hooks might not be called in the same order.
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  // Stores every click in a separate piece of state, initialized as empty array
  const [allClicks, setAll] = useState([])

  // Keep track of all button presses as one total
  const [total, setTotal] = useState(0)

  // Use concat to create a new copy of the array with L added to it, rather than mutating the existing array
  const handleLeftClick = () => {
    /* 
    // If we want to set a running total of all button presses, this code won't work:
    setAll(allClicks.concat('L'))
    console.log('left before', left)
    setLeft(left + 1)
    console.log('left after', left)
    setTotal(left + right)
    // This is because React updates asynchronously before the next render - the total will always be 1 less than it should be.
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  /*

    const handleLeftClick = () => {
    allClicks.push('L')
    setAll(allClicks)
    setLeft(left + 1)
  }
    // Don't use .push for this! Can lead to hard to debug problems. 


  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);

    /*
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right)

  }

  // Execution stops whenever you encounter this command. You can check the value of your variables!
  // debugger

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}

      <History allClicks={allClicks} />

      //This joins all the elements of the array into a single sting, separated by the provided space 
      <p>{allClicks.join(' ')}</p>
      <p>Total: {total}</p>
    </div>
  )
}

*/

/*
// For this to work, you need to define an eventHandler. 
// eventHandlers must always be a function or a reference to a function.
const App = () => {
  const [value, setValue] = useState(10) 

  <button onClick={console.log('clicked the button')}>
  button
</button>

  return (
    <div>
      {value}
      <button>reset to zero</button>

      // This won't work - do not mutate state directly.
      <button onClick={value = 0}>button</button>

      // But this also won't work: 
      <button onClick={console.log('clicked the button')}>
      button
    </button>
    // Because you cannot set a function call as the eventHandler
    // Also, try to always define eventHandlers in a separate place
    </div>
  )
}
*/

/*
const App = () => {
  const [value, setValue] = useState(10)


  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
      // The function is designed to return a function
    return handler
  }

  return (
    <div>
      {value}
      // This way, these buttons get their own personalized handlers
      // Functions return functions are good for generic functionality that can be customized with parameters
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
*/

// Always define components outside of other components
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}


export default App
