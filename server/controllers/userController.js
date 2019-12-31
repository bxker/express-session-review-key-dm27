const users = require('../data/users')
let id = 1;

function loginUser(req, res, next){
    const {username, password} = req.body

    let foundUser = users.find(user => user.username === username && user.password === password)
    if(!foundUser){
        res.status(401).send('Username or password incorrect')
    }else{
        req.session.user = foundUser
        res.status(200).json(req.session.user)
    }
}

function getUser(req, res, next){
    if(req.session.user){
        res.status(200).json(req.session.user)
    }else{
        res.status(404).json('no user on session')
    }
}

function addUser(req, res, next){
    const {username, password} = req.body
    let newUser = {
        id,
        username,
        password
    }
    users.push(newUser)
    id++
    req.session.user = newUser
    res.status(200).json(req.session.user)
}

function logoutUser(req, res, next){
    req.session.destroy()
    res.status(200).json('Logged out successfully')
}

module.exports = {
    loginUser,
    getUser,
    addUser,
    logoutUser
}