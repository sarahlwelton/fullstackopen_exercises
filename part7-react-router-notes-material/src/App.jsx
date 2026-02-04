import { useState } from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Alert,
  AppBar,
  IconButton,
  Toolbar
} from '@mui/material'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Note = ({ note }) => {
  // The useParams function lets us access the URL parameter (id of the note to be displayed)
  // We use this when the props is set to { notes } - in our new implementation, we don't need this
  //const id = useParams().id
  //const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}
// We render Notes as a clickable Link component that takes you to the body of the note
// With Material, we're still gonna render it as a table. 
const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }
  // Material does not have a Form component, so it's a regular HTML form
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type='password' />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5
  }
  // Every time the App component is rendered, if the URL matches '/notes/:id', then "match"
  // contains an object that lets us access the parameterized part of the path (the id of the note)
  // and we can fetch the correct note to display.
  const match = useMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null
  // We add the "container" className to start using Material.
  // We can change the root element that will be rendered by using the component prop
  // For the navbar, we make the root element for the buttons Link
  return (
    <Container>
      {(message &&
        <Alert variant="success">
          {message}
        </Alert>)}
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/notes">
              notes
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>   
            {user
              ? <em>{user} logged in</em>
              : <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
            }                              
          </Toolbar>
        </AppBar>
        <Routes>
          {/* notes/:id is defined as a parameterized URL */}
          <Route path="/notes/:id" element={<Note note={note} />} />
          <Route path="/notes" element={<Notes notes={notes} />} />
          {/* If a user isn't logged in, redirect to /login if they try to click Users */}
          <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      <footer>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </footer>
    </Container>
  )
}

export default App