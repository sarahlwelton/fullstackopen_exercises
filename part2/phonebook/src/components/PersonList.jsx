import Person from './Person'

const PersonList = ({ peopleList, removePerson }) => {

  return (
    <>
      <div>
          {peopleList.map(person =>
              <Person 
                key={person.id} 
                person={person}
                removePerson={removePerson}>
                
              </Person>
          )}
        </div>
    </>
  )
}

export default PersonList