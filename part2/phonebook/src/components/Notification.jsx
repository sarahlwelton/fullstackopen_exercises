const Notification = ({ message }) => {
  if (message === null) {
    return null
  } if (message.type === 'info') {

    const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <>
      <div style={notificationStyle}>
        <p>{message.message}</p>
      </div>
    </>
  )

  } if (message.type === 'error') {

      const notificationStyle = {
      color: 'red',
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }

    return (
      <>
        <div style={notificationStyle}>
          <p>{message.message}</p>
        </div>
      </>
    )
  } else {

    return null
  }
}

export default Notification