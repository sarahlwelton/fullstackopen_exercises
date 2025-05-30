import { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return ( 
  <button onClick={props.logFeedback}>
    {props.text}
  </button>
  )
}

const Statistics = (props) => {

  if (props.total === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={props.avg} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )

}

const StatisticLine = (props) => {

  if (props.text === "positive"){
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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
      <Statistics good={ good } bad={ bad } neutral={ neutral } total={ total } avg={ avg } positive={ positive }/>
    </div>
  )
}

export default App