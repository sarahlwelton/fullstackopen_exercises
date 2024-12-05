import Person from './Person'

const Persons = ({filteredPersons}) => {
  return (
    <div>
      {filteredPersons.map(person =>
        <Person key = {person.id} person={person} />
      )}
    </div>
  )
}

export default Persons