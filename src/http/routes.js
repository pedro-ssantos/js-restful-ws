const db = require('../services/mysql')
const routes = (server) => {
  server.post('/autenticacao', async (req, res, next) => {
    const { email, password } = req.params
    try {
      res.send(await db.auth().authenticate(email, password))
    } catch (errors) {
      res.send(errors)
    }
    next()
  })

  server.post('/usuario', async (req, res, next) => {
    const { email, password } = req.params
    try {
      res.send(await db.users().save(email, password))
    } catch (errors) {
      res.send(errors)
    }
    next()
  })

  server.get('/categoria', async (req, res, next) => {
    try {
      res.send(
        await db.categories().all()
      )
    } catch (errors) {
      res.send(errors)
    }
    next()
  })
  server.post('/categoria', async (req, res, next) => {
    const { name } = req.params
    try {
      res.send(
        await db.categories().save(name)
      )
    } catch (errors) {
      res.send(errors)
    }
    next()
  })
  server.put('/categoria', async (req, res, next) => {
    const { id, name } = req.params
    try {
      res.send(
        await db.categories().update(id, name)
      )
    } catch (errors) {
      res.send(errors)
    }
    next()
  })
  server.del('/categoria', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(
        await db.categories().del(id)
      )
    } catch (errors) {
      res.send(errors)
    }
    next()
  })

  server.get('/', (req, res, next) => {
    res.send('Enjoy the Silence...')
    next()
  })
}

module.exports = routes
