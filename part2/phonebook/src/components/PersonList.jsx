import Person from './Person'

const PersonList = ({ peopleList }) => {

  return (
    <>
      <div>
          {peopleList.map(person =>
              <Person key={person.id} person={person}></Person>
          )}
        </div>
    </>
  )
}

export default PersonList