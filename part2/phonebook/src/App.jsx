import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  })

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter)
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1
    }
    if (persons.some((person) => newName === person.name)) {
      window.alert(`${newName} is already in the phonebook.`)
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Do you want to delete the name and number for ${person.name}?`)){
      personService
      .remove(person.id)
      .catch(error => {
        alert(
          `${person.name} was already deleted from the phonebook.`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>Add a new name and number</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handlePersonChange={handlePersonChange} 
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        filteredPersons={filteredPersons} 
        removePerson={removePerson}/>
    </div>
  )
}

export default App