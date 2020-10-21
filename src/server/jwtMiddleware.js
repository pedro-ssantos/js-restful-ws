const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
  return async (req, res, next) => {
    if (!deps.exclusions.includes(req.href())) {
      const token = req.headers['x-acces-token']
      if (!token) {
        res.send(403, { error: 'Token não fornecido' })
        return false
      }
      try {
        req.decode = jwt.verify(token, process.env.JWT_SECRET)
      } catch (error) {
        res.send(403, { error: 'Falha ao atenticar o token' })
      }
    }
    next()
  }
}
module.exports = jwtMiddleware
