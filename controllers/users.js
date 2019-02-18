const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    console.log(body)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    
    const users = await User.find({});
    //console.log(users[0].username)
    if( users.length < 1) {
      const savedUser = await user.save()

      response.json(savedUser.toJSON)
    } else {

    
    for(i in users.length){
      if(users[i].username === body.username ){
        response.status(400).end()
      }
    }
  }

    
    
  } catch (exception) {
    next(exception)
  }
})



module.exports = usersRouter