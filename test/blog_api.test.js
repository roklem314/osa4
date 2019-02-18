const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')



beforeEach(async () => {
  await Blog.remove({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})
jest.setTimeout(30000)
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body.length)
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
   // console.log(response.body[0].title)
   const contents = response.body.map(r => r.title)
   expect(contents).toContain('React patterns')
  })
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
      author: 'JL',
      url: 'https://doc.ebichu.cc/jest',
      likes: 1000
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'async/await yksinkertaistaa asynkronisten funktioiden kutsua'
    )
    })
    test('a blog without likes value can be added and set to zero automatically', async () => {
        const newBlog = {
          title: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
          author: 'JL',
          url: 'https://jestjs.io/docs/en/expect#tobedefined',
          likes: undefined
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      
        const contents = blogsAtEnd.map(n => n.likes)
        expect(contents).toContain(
          0
        )
  })
  test('all blogs has id', async () => {
    const response = await api.get('/api/blogs')
        console.log(response.body.length)
        for(i in response.body.length){
            expect(response.body[i][4]).toBeDefined(id)
        }
        
        
  })
  test('blogs cant be add if title or url missing', async () => {
    const newBlog = {
        title: 'Testi',
        author: 'Putin',
        url: '',
        likes: undefined
      }
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    
  })
  test('blog can be deleted', async () => {
    const oneBlog = await helper.blogsInDb()
    const blogToDelete = oneBlog[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsOthers = await helper.blogsInDb()

    expect(blogsOthers.length).toBe(
        helper.initialBlogs.length - 1
    )

    const contents = blogsOthers.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})

describe('when there is initially one user at db', async () => {
    beforeEach(async () => {
      await User.remove({})
      const user = new User({ username: 'root',name: 'Rooter', password: 'sekret' })
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'salMander',
        name: 'Tom Valedro',
        password: 'ridle'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
     // .expect('Content-Type', /application\/json/)

    //expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})