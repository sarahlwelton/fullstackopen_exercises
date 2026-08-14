import { useState } from 'react'

const Button = (props) => {

  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const SingleStat = (props) => {

  if (props.text === "positive feedback") {
    return (
      <>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}%</td>
        </tr>
      </>
    )
  }

  return (
    <>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Stats = (props) => {
  const calculatedAverage = props.average.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / props.average.length

  const positive = (props.good / (props.good + props.neutral + props.bad)) * 100

  if (props.average.length === 0) {
    return (
    <>
      <table>
        <tbody>
          <tr>
            <td>No feedback yet</td>
          </tr>
        </tbody>
      </table>
    </>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <SingleStat text="good" value={props.good}></SingleStat>
          <SingleStat text="neutral" value={props.neutral}></SingleStat>
          <SingleStat text="bad" value={props.bad}></SingleStat>
          <SingleStat text="total" value={props.good + props.neutral + props.bad}></SingleStat>
          <SingleStat text="average" value={calculatedAverage}></SingleStat>
          <SingleStat text="positive feedback" value={positive}></SingleStat>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState([])

  const handleGood = () => {
  setAverage(average.concat(1))
  setGood(good + 1 )
}

  const handleNeutral = () => {
    setAverage(average.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setAverage(average.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="good" good={good}></Button>
      <Button onClick={handleNeutral} text="neutral" neutral={neutral}></Button>
      <Button onClick={handleBad} text="bad" bad={bad}></Button>
      <h1>Statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} average={average}></Stats>
    </div>
  )
}

export default App