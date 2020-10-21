const test = require('ava')
const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

const create = () => users.save('user@test.com', '123456')

test('Criação de usuario', async t => {
  const result = await create()
  t.is(result.user.email, 'user@test.com')
})

test('Atualização de usuario', async t => {
  await create()
  const updated = await users.update(1, '123456789')
  t.is(updated.affectedRows, 1)
})

test('Remoção de Categoria', async t => {
  await create()
  const removed = await users.del(1)
  t.is(removed.affectedRows, 1)
})

// test('Lista de categoria', async t => {
//   await create()
//   const list = await users.all()
//   console.log(list)
//   t.is(list.users.length, 1)
//   t.is(list.users[0].user, 'user@test.com')
// })
