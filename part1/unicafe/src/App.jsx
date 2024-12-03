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
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const logGoodFeedback = () => {
    console.log('good', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral +  bad)
    const updatedTotal = total + 1
    setAvg((avg + 1) / updatedTotal)
    setPositive((updatedGood / updatedTotal) * 100)
  }

  const logNeutralFeedback = () => {
    console.log('neutral', neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    const updatedTotal = total + 1
    setAvg((avg + 0) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
  }

  const logBadFeedback = () => {
    console.log('bad', bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    const updatedTotal = total + 1
    setAvg((avg - 1) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
    
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
      <p>all {total}</p>
      <p>average {avg}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App