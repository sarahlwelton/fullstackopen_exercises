import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/Login'

const App = () => {
  
  const [notes, setNotes] = useState(null)
  // const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  // Let's add the Username and Password states
  const [user, setUser] = useState(null)
  //const [loginVisible, setLoginVisible] = useState(false)

  // Let's set a way to hide the new note form after we
  // create a new note
  const noteFormRef = useRef()

  // Let's add a second effect hook to check if there's already a logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  // Since we attached an empty array, we only check for the logged in user the first time
  // App is rendered
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })
  }, [])
  if (!notes) {
    return null
  }


  const addNote = (noteObject) => {
    // We move the event handler into the NoteForm component, instead
    /* event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    } */
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)  
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        //setNewNote('')
      })
  }

 /* const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  } */

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)       
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // We add the new event handler to handle logins
/*   const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
      
      try {
        const user = await loginService.login({
          username, password,
        })
        // We save the value of the logged in user to local storage, so reloading the page
        // remembers who's logged in
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )
        // Call the noteService to setToken
        noteService.setToken(user.token)
        // Empty the form fields on successful login and set the user to the API response
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  } */
  // Let's add two helper functions to handle the login and notes forms
  // We should only display the login form when the user is not logged in (user === null)
  /* const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
    )     
  } */

  // Now, we can implement the forms using the Togglable component, and the Form components
  // as children
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm 
        setUser={setUser}
        setErrorMessage={setErrorMessage} />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable> 
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {/* Instead of displaying the forms always, display them conditionally */}
      {/*{user === null && loginForm()}
      {user !== null && noteForm()}*/}
      {user === null ?
      loginForm() : 
      <div>
        <p>{user.name} logged-in</p>
        {noteForm()}
      </div>
      }
      <h2>Notes</h2>
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
      <Footer />   
    </div>
  )
}


export default App