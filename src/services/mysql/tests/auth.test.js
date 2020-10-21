const test = require('ava')
const { connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

const create = () => users.save('user@test.com', '123456')

test('Login de usuario - sucesso', async t => {
  await create()
  const result = await auth.authenticate('user@test.com', '123456')
  t.not(result.token, null)
  t.not(result.token.length, 0)
})

// test('Login de usuario - falha', async t => {
//   await create()
//   const promise = auth.authenticate('userfail@test.com', '123456')
//   const error = await t.throwsAsync((promise))
//   t.is(error.error, 'Falha ao localizar Usuario')
// })
