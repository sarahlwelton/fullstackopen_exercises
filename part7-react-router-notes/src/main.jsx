
// This is not a very elegant solution, so we'll use React Router instead.
/*import { useState }  from 'react'

// We implemented each view as its own component
const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = () => (
  <div> <h2>Notes</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  // We set the application state to tell us which component to view
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'notes') {
      return <Notes />
    } else if (page === 'users') {
      return <Users />
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <a href="" onClick={toPage('home')} style={padding}>
          home
        </a>
        <a href="" onClick={toPage('notes')} style={padding}>
          notes
        </a>
        <a href="" onClick={toPage('users')} style={padding}>
          users
        </a>
      </div>

      {content()}
    </div>
  )
}
*/

/*
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ReactDOM from 'react-dom/client'

const App = () => {

  const padding = {
    padding: 5
  }

  // We conditionally render components based on the URL in the browser, by using Router components
  // (These are technically BrowserRouter but we renamed in the import)
  // Router uses the HTML5 history API to keep your UI in sync with the URL

  // BrowserRouter lets us use the URL in the address bar of the browser for internal "routing" in React

  // We use the Link component to define the links that modify the address bar - they change the address
  // in the address bar

  // We use the Route component to define the component that is rendered based on the browser URL
  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}
*/

import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter as Router,
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
