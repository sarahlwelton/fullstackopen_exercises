import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  // The App component does not need the contents of a new note before it has been created - the state can move here
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          data-testid='notebox'
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here'
          id='note-input'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm