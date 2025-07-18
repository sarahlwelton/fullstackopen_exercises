import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {

  // To get the app to re-render when we add a new note, we need to define how to invalidate
  // the original query with the 'notes' key with the QueryClient 
  const queryClient = useQueryClient()

  // To create a new note, we define a mutation with useMutation
  // We define it with the function defined in requests.js
  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    // We use this specific code to invalidate the results of 'notes' on createNote being successful
    onSuccess: (newNote) => {
      // Instead, we now read the existing notes state of the query, and update it by adding a new note
      // which is obtained as a parameter of the callback function 
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))

      // This works, but in a larger application, launching another GET request after a PUT 
      // might put unnecessary strain on the server. 
      // queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
    // In our event handler, we call the mutate function and pass the new note as an arg
    newNoteMutation.mutate({ content, important: true })
  }

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData(['notes'])
      const updatedNotes = notes.map(note => 
        note.id !== updatedNote.id ? note : updatedNote
      )

      queryClient.setQueryData(['notes'], updatedNotes)
      // queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  // We still use axios get to get the notes - but it's now wrapped in a query
  // The first part of the query is a string that acts as a key to the query
  // The return value of the function is an object that indicates the status of the query
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    // This stops React Query from refetching the query when the active element of the UI changes
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))
  // We use this to display the text "loading data..." when the object returned by the query has isLoading as true
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  // Then, we get the field data from the query - which is the data returned by the request
  // We don't need to use useState and useEffect hooks at all - the React Query library handles it all
  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App