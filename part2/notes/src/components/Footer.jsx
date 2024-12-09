const Footer = () => {
    // CSS inline styles are written in camelCase 
    // px values are written as simple integers
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
    )
  }
  
  export default Footer

