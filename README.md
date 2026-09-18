# Week 2 Node Express API

    A Node.js Express API for the Week 2 assignment.

    ## Run locally

    ```bash
    npm install
    npm start
    ```

    The server uses the PORT environment variable and defaults to port 3000.

    ## Routes

    - GET / — serves the static HTML page containing "My Week 2 API!"
    - POST /user — accepts JSON with name and email, then returns "Hello, [name]!"
    - GET /user/:id — returns "User [id] profile"
    - POST /user with missing name or email — returns HTTP 400
    - POST /user with malformed JSON — returns HTTP 400

    ## Test with curl

    ```bash
    curl http://localhost:3000/

    curl -X POST http://localhost:3000/user \
    -H "Content-Type: application/json" \
    -d '{"name":"Ada","email":"ada@example.com"}'

    curl -i -X POST http://localhost:3000/user \
    -H "Content-Type: application/json" \
    -d '{"name":"Ada"}'

    curl http://localhost:3000/user/42
    ```
    