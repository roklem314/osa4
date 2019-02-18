const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1, id: 1})

  response.json(users.map(user => user.toJSON()))
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    //console.log(body.password.length)
    if (body.password.length < 3 || body.name.length < 3) {
        response.status(400).end();
    }
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
    if( users.length > 1) {
      for(i in users.length){
        if(users[i].username === body.username ){
          response.status(400).end()
        }
      }
    }

      const savedUser = await user.save()

      response.json(savedUser.toJSON)
    
    
  } catch (exception) {
    next(exception)
  }
})



module.exports = usersRouter