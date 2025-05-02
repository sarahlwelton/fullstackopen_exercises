import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

// This test verifies that the component renders the contents of the note
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note} />)

  // This will print the HTML to the console during the test
  screen.debug()
  // We can put a specific element in the () to print that element to the console
  // - instead of the whole HTML

  // We can use querySelector instead to use CSS-selectors to find components
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  // This actually does the rendering - but not to the DOM
  //render(<Note note={note} />)

  // Use the screen object to access the rendered component
  //const element = screen.getByText('Component testing is done with react-testing-library')
  // Checks to make sure whether element exists
  // We don't really need this line, as the previous getByText will fail the test if not found
  //expect(element).toBeDefined()
})

/* test('renders content', () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true
  }

  render(<Note note={note} />)
  // If we only want to find a component that CONTAINS the text... 
  // We can use either of these
  const element = screen.getByText('Does not work anymore :(', {exact: false})
  // Remember: findByText returns a promise
  const element = await screen.findByText('Does not work anymore :(')

  expect(element).toBeDefined()
}) */

  test('does not render this', () => {
    const note = {
      content: 'This is a reminder',
      important: true
    }
  
    render(<Note note={note} />)
    // If we wanted to check that something isn't rendered, we want this method. 
    // It does not cause an exception if something isn't found. 
    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
  })

// This test makes sure that clicking the button for toggleImportance calls the eventHandler
test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  // We use Vitest to define a mock function
  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )
  // Start a session to interact with the rendered component
  const user = userEvent.setup()
  // Find the button based on the text from the rendered component
  const button = screen.getByText('make not important')
  // Click the button
  await user.click(button)
  // This checks that the mock function has been called once
  // The calls to the mock function are saved to the array, mock.calls
  expect(mockHandler.mock.calls).toHaveLength(1)
})