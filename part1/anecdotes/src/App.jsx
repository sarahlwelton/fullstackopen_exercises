import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Fill the array with the correct number of 0s to start the State
  let initialPoints = Array(anecdotes.length).fill(0, 0, anecdotes.length)
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initialPoints)

  const randomAnecdote = (min, max) => {
    // console.log('min', min, 'max', max)
    const random = Math.floor(Math.random() * max)
    setSelected(random)
    console.log('selected anecdote', selected)
  }

  const vote = (points) => {
    // Check current value of points
    console.log('points', points)
    // Create new copy of points array to mutate
    const copyPoints = [...points]
    // Check value of new array, copyPoints
    console.log('copyPoints before', copyPoints)
    // Increment the anecdote's vote value that was selected by randomAnecdote()
    copyPoints[selected] += 1
    // Set state to new mutated array
    setPoints(copyPoints)
    // Log value of new array, just to be sure. 
    console.log('copyPoints after', copyPoints)

  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has { points[selected] } votes</p>
      <button onClick={() => vote(points)}>vote</button>
      <button onClick={() => randomAnecdote(0, anecdotes.length)}>next anecdote</button>
    </div>
  )
}

export default App