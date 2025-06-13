import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

// This just renders a single note - it is 
// not aware that the eventHandler it receives
// as props dispatches an action
// This is a presentational component
const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

// This is a container component - it contains
// some application logic, defining 
// what the eventHandlers of the Note components
// do, and coordinates the configuration of 
// presentational components 
const Notes = () => {

  const dispatch = useDispatch()
  // We use the useSelector hook to access the notes stored in the store
  // useSelector needs a function as a parameter - to search or select data
  // from the Redux store. We need all the notes, so we just return the whole state.
  const notes = useSelector(state => state)
  // For example, if we wanted to return only important notes:
  // const importantNotes = useSelector(state => state.filter(note => note.important)) 

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes