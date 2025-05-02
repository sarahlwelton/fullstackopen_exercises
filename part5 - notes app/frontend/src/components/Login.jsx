import { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'
import PropTypes from 'prop-types'

// Extract the login form to its own component
const LoginForm = ({ setUser, setErrorMessage }) => {
  // Similar to the noteForm, we don't need these 
  // states outside of this component. 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

      try {
        const user = await loginService.login({
          username, password,
        })

        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )

        noteService.setToken(user.token)

        setUser(user)

      } catch (exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
  }
 return (
   <div>
     <h2>Login</h2>

     <form onSubmit={handleLogin}>
       <div>
         username
         <input
           value={username}
           onChange={event => setUsername(event.target.value)}
         />
       </div>
       <div>
         password
         <input
           type="password"
           value={password}
           onChange={event => setPassword(event.target.value)}
         />
     </div>
       <button type="submit">login</button>
     </form>
   </div>
 )
}

// Add PropTypes validation for all props on LoginForm
LoginForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm