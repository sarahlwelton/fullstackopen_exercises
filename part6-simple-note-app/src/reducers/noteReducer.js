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


const noteReducer = (state = [], action) => {
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
}

  // Move the action creators into the Reducer
  const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

  // We can have one 'default' export but multiple normal exports in a single module
  export const createNote = (content) => {
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
  }

// This is the very basic reducer, the one that we start with for one task
/* const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {

    return state.concat(action.payload)
  }

  return state
} */

export default noteReducer;