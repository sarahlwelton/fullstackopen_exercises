// Let's use the Redux Toolkit to refactor the reducer function
// We also need to import the current function to get the state of our store in human-readable
// format while debugging
import { createSlice, current } from '@reduxjs/toolkit'

// This new reducer sets state to an array
// The NEW_NOTE action adds notes to the state array with state.push
// BUT THIS IS BAD. This changes the state of the state-object. 
// We should use concat instead, to create a new array. 
/* const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload)
    return state
  }

  return state
} */

// Let's initialize the state with a couple notes to ease development
const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

/* const noteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      // Let's change this to use the array spread syntax from JS
      //return state.concat(action.payload)
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      // First, find the specific note object in state
      const noteToChange = state.find(n => n.id === id)
      // Then, create a new object, which is a copy of the original note object
      // But change the importance to the opposite of what it was
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      // Return the new state as all the notes from the old state
      // But replace the desired note with its copy
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
     }
    default:
      return state
  }
} */

  // Move the action creators into the Reducer
  const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

// With the Redux Toolkit, we now use createSlice to refactor the reducer and action creators
  const noteSlice = createSlice({
    // This defines the prefix used in the action's type values
    name: 'notes',
    // This defines the initial state
    initialState,
    // This takes the reducers as an object, with functions handling the state changes of specific actions
    reducers: {
      createNote(state, action) {
        const content = action.payload
        // We are mutating the state argument's array instead of returning a new array now
        // The Immer library uses the mutated state to create a new, immutable state
        // Mutating state is useful for updating complex states
        state.push({
          content,
          important: false,
          id: generateId(),
        })
      },
      toggleImportanceOf(state, action) {
        const id = action.payload
        const noteToChange = state.find(n => n.id === id)
        const changedNote = { 
          ...noteToChange, 
          important: !noteToChange.important 
        }
        
        console.log(current(state))
        
        // We can still return/change state without mutating it. 
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )     
      }
    },
  })

  // We can have one 'default' export but multiple normal exports in a single module
  /* export const createNote = (content) => {
    return {
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    }
  }

  export const toggleImportanceOf = (id) => {
    return {
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    }
  } */

// This is the very basic reducer, the one that we start with for one task
/* const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {

    return state.concat(action.payload)
  }

  return state
} */

  // Now, we structure the exports like this. 
export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer