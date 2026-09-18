import { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

 }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update their phone number?`)){

        const person = persons.find(person => person.name === newName)

        const id = person.id

        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          })
        setNewName('')
        setNewNumber('')
        setMessage(`Updated ${person.name} in the phonebook.`)
        setTimeout(() => {
        setMessage(null)
      }, 3000)
      }
      
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name} to the phonebook.`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const removePerson = (person, id) => {
    if (window.confirm(`Do you want to delete ${person.name} from the phonebook?`)){
      personService
      .remove(id)
      .then(person => {
        const id = person.id
        setPersons(persons.filter(person => person.id !== id))
      })
      setMessage(`Removed ${person.name} from the phonebook.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const peopleList = filter.length < 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a New Entry</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonList peopleList={peopleList} removePerson={removePerson}/>
    </div>
  )
}

export default App