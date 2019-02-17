const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try{
  const body = request.body
  console.log(body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })
  if((body.title === "" | body.title === undefined) | (body.url === "" | body.url === undefined))  {
      response.status(400).end()
   } else {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
   }
  }
    catch(exception) {
    next(exception)
  }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
  console.log(request.params)
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', (request, response, next) => {

  const body = request.body
  if(body.title === " ") {
    response.status(400).end()
  }
  

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedblog => {
      response.json(updatedblog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter