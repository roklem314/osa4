const mongoose = require('mongoose')
const uniqueVlidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      minLenght: 3
    },
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
  })

userSchema.plugin(uniqueVlidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // suodatetaan passwordHash eli salasanan tiiviste pois näkyviltä
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User