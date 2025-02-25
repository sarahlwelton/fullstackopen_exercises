const Header = ( {course} ) => {
    console.log('the course Header received is', course)
    return (
      <>
        <h2>{course.name}</h2>
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
  
  const Total = ( {course} ) => {
  
    const parts = course.parts
    console.log('parts is', parts)
  
    const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    console.log('total is', total)
  
    return (
      <>
        <p><strong>Total exercises: {total} </strong></p>
      </>
    )
  }
  
  const Course = ( {course} ) => {
    console.log('this is the course in Course', course);
  
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
    
  }

export default Course