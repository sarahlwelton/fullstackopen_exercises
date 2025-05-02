import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)
  // The test gets access to the input field using getByRole
  // const input = screen.getByRole('textbox')
  // If we have multiple input fields, we can do this instead:
  // const inputs = screen.getAllByRole('textbox')
  const input = screen.getByPlaceholderText('write note content here')
  // If we added the id to the element, we can also do this: 
  // const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('save')
  // Use user.type to write text to the input field
  // await user.type(input, 'testing a form...')
  // If we have multiple textboxes, we need to choose which one.
  // But, this is still fragile because it relies on the order of the fields
  // await user.type(inputs[0], 'testing a form...')
  await user.type(input, 'testing a form...')
  await user.click(sendButton)
  // Check that submitting the form calls createNote
  expect(createNote.mock.calls).toHaveLength(1)
  // Check that a note with the correct content is created
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})