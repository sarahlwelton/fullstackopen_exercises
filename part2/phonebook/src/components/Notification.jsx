const Notification = ({ message }) => {

    if (message === null) {
        return null
    }
    const messageStyle = {
        color: 'green',
        fontSize: '20px',
        marginTop: '6px',
        marginBottom: '10px',
        padding: '10px',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: '6px'

    }
    return (
        <div className="success" style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification