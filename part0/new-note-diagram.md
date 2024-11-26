```mermaid
sequenceDiagram

actor User
participant browser
participant server

User-->>browser: Enters message and clicks Save
activate browser
browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
deactivate browser

Note right of server: The server executes its own code to access the req.body and create a new note object, adding it to the array called notes.

destroy User
activate server
server-->>browser: 302 URL Redirect 
deactivate server

```