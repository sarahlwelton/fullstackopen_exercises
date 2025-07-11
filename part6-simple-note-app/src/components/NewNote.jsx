import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = () => {
  // We don't use the .dispatch method on the store, but instead, 
  // use the dispatch function on the useDispatch hook
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // For example, the dispatch function on the useDispatch hook
    // This lets any React component access the dispatch function
    // of the Redux store defined in main.jsx
    // So, any component can make changes to the Redux store
    // dispatch(createNote(content))

    // Use the noteService to create a new note on the backend
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote