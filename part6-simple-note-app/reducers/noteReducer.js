
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

// This is the very basic reducer, the one that we start with for one task
/* const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {

    return state.concat(action.payload)
  }

  return state
} */

export default noteReducer;