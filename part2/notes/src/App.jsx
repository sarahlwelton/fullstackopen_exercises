// Add useEffect for calls to external systems!
import { useState, useEffect } from 'react'
import axios from 'axios'
// Give file location in relation to the importing file, and you can omit file extension
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

/* Move Note into its own component file 
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}
*/

// Update App to useState
// Then update to remove the passing of props from main.jsx
const App = () => {
  // Setting this to an empty array is masking a potential error - the data is not yet fetched from the backend on the first render
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  // Add state to toggle only important notes
  const [showAll, setShowAll] = useState(true)
  // Add state to test the new Notification component
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // Use the defined services/notes.js to define the effect hook:
  useEffect(() => {
    // Since we only use the response.data property, we can modify things further:
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })
    /*
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
    */
  // This empty array is good, when we are initializing app state from the server
  // We can set this to a value to change/use the effect function when a value changes
  }, [])
  // Allows us to set the initial state of notes to "null" and display the notes correctly on the second render
  if (!notes) {
    return null
  }

  // This retrieves notes from the localhost server
  // This is the most compact way to represent things
  /*
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  */
  // console.log('render', notes.length, 'notes')
  

  // This way, we see more clearly that useEffect takes 2 parameters: what will run after every completed render (a function), and how often to run the effect.
  // If we set the second parameter to an empty array ([]), the effect only runs on the first component render
  /*
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
  */

  // We can also write it this way - the event handler function is assigned to eventHandler
  // Promise from axios is assigned to promise 
  // eventHandler is assigned as a parameter to the then method in the promise
  /*
  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, [])
  */

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    // Again, update to use ./services/notes.js > noteService
    noteService
      .create(noteObject)
      
      /*
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
      */
     // Modify further to take advatnage of passing just response.data
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  /*
  // Handle the "save" button in the UI.
  // Create a new noteObject with the content of newNote
  // The important value has a 50% chance to be true
  // id is just length + 1 since 
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // We can remove this when it's sent to a server - it's better for the server to generate IDs
      // id: String(notes.length + 1),
    }
    // concat creates a new array with noteObject added to the end
    //setNotes(notes.concat(noteObject))
    //setNewNote('')

    // Use axios to send a post request to the server, and update the notes array there - then update state
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }
  */

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    // In this version, we use the defined ./services/notes.js > noteService
    /*
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note))
      })
    */
    // We can take it further to just use the response.data returned by the module
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      // Add a catch method to add an error handler - it will display if any of the promises in the chain fail
      // The user sees an alert dialog
      .catch(error => {
        // Let's use the new error message/Notification component 
        setErrorMessage(
          `Note '${note.content}' was already removed from the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        /*
        alert(
          `the note '${note.content}' was already deleted from server`
        )
          */
        // The filter method removes the note from the note state - based on notes NOT matching the provided id that was provided as a parameter
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  /*
  // Add a function for toggling importance in the note component
  // Every note will get a unique eventHandler, since every note has a unique ID
  const toggleImportanceOf = id => {
    // Use backticks because we're using a template string that fills in the id value
    const url = `http://localhost:3001/notes/${id}`
    // Use find to find the note (n) with the correct id value and assign it to const note
    const note = notes.find(n => n.id === id)
    // Create a new object that is an exact copy of the old note object, except for flipping the important property
    // Use the object spread syntax to preserve all of the properties from the original object
    // Properties added inside the curly braces after will get assigned the appropriate value - in this case, the opposite of whatever important currently is
    const changedNote = { ...note, important: !note.important }
    // This is a shallow copy of the old note object - if the values of the old object were objects, a shallow copy would reference the same objects in the old object
  
    // The PUT request sends the changedNote to the backend to replace the old object
    axios.put(url, changedNote).then(response => {
      // The callback function sets the notes state to a new array that contains all of the notes from the previous array, except for the updated note returned by the server
      // We use the map method for this.
      // We do it conditionally - if the note ID === id, the note object returned by the server is added to the array 
      // If note id != id, then the item from the old array is copied
      setNotes(notes.map(n => n.id === id ? response.data : n))
    })
  }
  */

  // If showAll is true, display notes. Otherwise, use notes.filter(note => note.important)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      {/* <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul> */}
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>
      <Footer />   
    </div>
  )
}

/* When we create a new component for Notes, the key has to be defined on the component itself 
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
*/

/*
const App = ({ notes }) => {

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        { This works, but isn't practical if we expand the array of notes }
         <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
        
        { notes.map(note =>
            React needs "key" attributes for the objects (elements) generated by map(). 
            React uses key attributes  to determine how to update the view generated by a component 
            when the component is re-rendered. 
            
            Also, don't forget the curly braces - you'll get errors if you do not include them.
          <li key={note.id}>
            {note.content}
          </li>
        ) }
      </ul>
    </div>
  )
}
*/


export default App