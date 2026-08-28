const Course = ({ course }) => {
  console.log(course)
  return (
    <>
      <Header name={course.name}></Header>
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} part={part}></Part>
        )}
      </ul>
      <TotalExercises parts={course.parts}></TotalExercises>
    </>
  )
}

const Header = ({ name }) => {
  console.log(name)
  return (
    <>
      <h2>{name}</h2>
    </>
  )
}

const Part = ({ part }) => {
  console.log(part)
  return (
    <>
      <p>{part.name}: {part.exercises}</p>
    </>
  )
}

const TotalExercises = ({ parts }) => {
  console.log(parts)
  const total = parts.reduce((total, part) => total + part.exercises, 0)

  return (
    <>
      <p><strong>Total of {total} exercises</strong></p>
    </>
  )
}

export default Course