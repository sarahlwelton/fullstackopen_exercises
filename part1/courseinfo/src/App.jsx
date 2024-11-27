/* props is the container that holds all the data passed to this componenent when it's called.
It "holds" the course object, which contains the name key & value */
const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

/* Since we passed the objects as part={props.parts[]} in <Content />, the props container inside Part generates the object like this: 

part: {
    part: { 
      name: "name value", 
      exercises: 10
    },
    ...
  ]
  
} 

So, need to access .name and .exercises as props.part.name / props.part.exercises */
const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.part.name}: {props.part.exercises}
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App