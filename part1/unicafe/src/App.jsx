import { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return ( 
  <button onClick={props.logFeedback}>
    {props.text}
  </button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const logGoodFeedback = () => {
    console.log(good)
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const logNeutralFeedback = () => {
    console.log(neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const logBadFeedback = () => {
    console.log(bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button logFeedback={() => logGoodFeedback()} text="good"/>
      <Button logFeedback={() => logNeutralFeedback()} text="neutral"/>
      <Button logFeedback={() => logBadFeedback()} text="bad"/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App