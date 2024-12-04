
const Header = ( {course} ) => {
  console.log('the course Header received is', course)
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = ( {course} ) => {
  console.log('the course Content received is', course)
  const parts = course.parts

  console.log(parts)
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}


const Part = ( {part} ) => {
  console.log('the part Part received is', part)
  return (
    <>
      <p>
        {part.name}: {part.exercises}
      </p>
    </>
  )
}

/* Props still contains the parts array - need to access properties as props.parts[].property */
const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
    </>
  )
}

const Course = ( {course} ) => {
  console.log('this is the course in Course', course);

  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
  
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Rendering a collection, modules',
        exercises: 4,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App