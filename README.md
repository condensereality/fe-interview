## Backend
Python version: 3.10 - set up a virtualenv in your favourite way.

- `cd backend`
- `pip install -r req.txt`
- `uvicorn main:app --reload`

Send data with curl:
`curl -X POST http://0.0.0.0:8000 -H "Content-Type: application/json" -d '{"id": "1","name": "Test Rig","status": "ready","framerate": 15}'`

## Frontend
Node version: 16.13 (npm 8.1) - set up using nodenv or nvm

Using 
- Export environment variables:
- `export REACT_APP_WS_HOST_URL="wss://cr-fe-interview.herokuapp.com"`
- `export REACT_APP_HOST_URL="https://cr-fe-interview.herokuapp.com"`
- `cd frontend`
- `npm ci`
- `npm start`

To test:
- `npm test`

Depending on which type of components you wish to use (functional - with hooks) or class based, uncomment the relevant lines in `index.tsx`