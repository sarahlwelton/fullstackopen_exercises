```mermaid
sequenceDiagram

participant browser
participant server
actor User

User->>browser: Enters message and clicks Save
activate browser
browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
deactivate browser

server->>browser: URL Redirect 

```