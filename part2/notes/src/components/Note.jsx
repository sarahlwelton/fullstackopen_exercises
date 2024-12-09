// Add a button to toggle the importance of buttons
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
// We have to use the className attribute instead of "class=""" in JSX
  
export default Note