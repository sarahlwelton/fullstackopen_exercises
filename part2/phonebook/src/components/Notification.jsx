const Notification = ({ message }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  return (
    <>
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    </>
  )
}

export default Notification