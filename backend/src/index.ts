import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()



app.post('/api/v1/user/signup', async (c) => {

  const body = await c.req.json()

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    // duplicate email
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
  }catch(e){
    c.status(403);
    return c.text('User already exists')
  }

  return c.text('sign-up successful')
});

app.post('/api/v1/user/signin', (c) => {
  return c.text('Hello World')
});

app.post('/api/v1/blog', (c) => {
  return c.text('Hello World')
});

app.put('/api/v1/blog', (c) => {
  return c.text('Hello World')
});

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello World')
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello World')
});

 

export default app
