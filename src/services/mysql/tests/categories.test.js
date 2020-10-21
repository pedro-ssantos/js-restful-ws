const test = require('ava')
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE catagories'))
test.after.always(t => connection.query('TRUNCATE TABLE catagories'))

const create = () => categories.save('category-test')

test('Criação de categoria', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

test('Atualização de Categoria', async t => {
  await create()
  const updated = await categories.update(1, 'category-test-update')
  t.is(updated.category.name, 'category-test-update')
  t.is(updated.affectedRows, 1)
})

test('Remoção de Categoria', async t => {
  await create()
  const removed = await categories.del(1)
  t.is(removed.affectedRows, 1)
})

// test('Lista de categoria', async t => {
//   await create()
//   const list = await categories.all()
//   console.log(list)
//   t.is(list.categories.length, 1)
//   t.is(list.categories[0].name, 'category-test')
// })
