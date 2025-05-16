const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

// To run tests using the UI: 
// npm test -- --ui

// To debug tests:
// npm test -- -g'test_name' --debug

// Make sure to run backend with:
// npm run start:test

// To only run a single test at once while developing tests, don't forget 
// to use test.only instead of just test
// Or, use the command line parameter: 
// npm test -- -g "login fails with wrong password"
describe('Note app', () => {
  // Before each test, empty the database and create a new user
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {

    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('user can open log in form and log in', async ({ page }) => {

    //await page.getByRole('button', { name: 'log in' }).click()
    
    // await page.getByTestId('username').fill('mluukkai')
    // await page.getByTestId('password').fill('salainen')
    // This is still fragile because the order of the text fields could change
    // await page.getByRole('textbox').first().fill('mluukkai')
    // await page.getByRole('textbox').last().fill('salainen')
    // await page.getByRole('button', { name: 'log in' }).click()

    // If we had more than 2 text fields on the page:
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('mluukkai')
    // await textboxes[1].fill('salainen')
    // But this is also still fragile.
    await loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'log in' }).click()

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      // await page.getByRole('button', { name: 'new note' }).click()
      // await page.getByTestId('notebox').fill('a note created by playwright')
      // await page.getByRole('textbox').fill('a note created by playwright')
      // await page.getByRole('button', { name: 'save' }).click()
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exist', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
        /* await page.getByRole('button', { name: 'new note' }).click()
        await page.getByRole('textbox').fill('another note by playwright')
        await page.getByRole('button', { name: 'save' }).click() */
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')
    
        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()


        // This retrieves the parent element the getByText element
        // The locator function can take CSS selectors or XPath selectors
        // Using .. is the simplest way to get the parent of the element
        //const otherNoteElement = await page.getByText('first note').locator('..')

        //await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        //await expect(otherNoteElement.getByText('make important')).toBeVisible()
        
        // This all breaks if the note text is inside a span element
        /* await page.getByText('first note')
          .getByRole('button', { name: 'make not important' }).click()

        await expect(page.getByText('first note').getByText('make important')).toBeVisible() */
        /* const otherNoteElement = await page.getByText('first note')

        await otherNoteElement
          .getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible() */
      })
    }) 
  })
})