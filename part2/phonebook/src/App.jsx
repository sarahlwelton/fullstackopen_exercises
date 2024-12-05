import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <p>{person.name}: {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some((person) => newName === person.name)) {
      window.alert(`${newName} is already in the phonebook.`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const findPerson = ({persons}, searchString) => {
    console.log('persons is', persons)
    console.log('personFilter is', searchString)
    
    const lowerCaseFilter = searchString
    console.log(lowerCaseFilter)

    if (searchString) {
      return persons.filter(person => {
        return person.name.toLowerCase().includes(lowerCaseFilter)
      })
    } else {
      return persons
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

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search for <input 
        onChange={handleFilterChange}/>
      </div>
      <h2>Add a new number</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
          <Person key = {person.id} person={person} />
        )}
      </div>
    </div>
  )
}

export default App