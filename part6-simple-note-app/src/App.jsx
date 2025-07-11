import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [])
  
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

// We used the same 'name' attribute on all of the radio buttons 
// This makes a button group, where we can only select one option 
/*const App = () => {

  const filterSelected = (value) => {
    console.log(value)
  }

  return (
    <div>
      <NewNote />
      <div>
        all          <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} />
        important    <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />
        nonimportant <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
      <Notes />
    </div>
  )
} */

export default App


/* We used all of this when App contained all of the code. 

// Actions need two fields: 
// Type = set the type of action
// Payload = set the data that needs to be included with the action
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {

  const addNote = (event) => {
    event.preventDefault()
    // Get the content of the new note straight from the form field
    // The field has a name, so we can access it like {name}.value
    const content = event.target.note.value
    event.target.note.value = ''
    // We can get the right action by calling the creator function
    store.dispatch(createNote(content))
     store.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    }) 
  }

  // This time, we change note importance by clicking its name
  const toggleImportance = (id) => {
    // Again, get the right action by calling the creator function
    store.dispatch(toggleImportanceOf(id))
     store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    })
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App

*/