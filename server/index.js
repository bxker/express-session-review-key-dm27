require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')

const {loginUser, getUser, addUser, logoutUser} = require('./controllers/userController')
const {SERVER_PORT, SESSION_SECRET} = process.env;

//middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}));

//endpoints
app.get('/auth/user', getUser)
app.post('/auth/user', addUser)
app.post('/auth/login', loginUser)
app.post('/auth/logout', logoutUser)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))