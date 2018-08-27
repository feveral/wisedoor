const User = require('../models/User')

module.exports = {

  async authenticate (req, res, next) {
    if (req.user) {
      next()
      return
    }
    try {
      const userEmail = req.body.email
      const userPassword = req.body.password
      if (! await User.IsSignInCorrect(userEmail, userPassword)) {
        res.status(401).send({ error: 'authentication error.' })
        return
      }
    } catch (error) {
      res.status(401).send({ error: 'authentication error.' })
      return
    }
    next()
    return
  },

  async login (req, res) {
    const name = await User.findNameByEmail(req.user)
    res.status(200).send( { success:true,name:name } )
  },  

  logout (req, res) {
    req.logout();
    res.status(200).send( { success:`You've successfully logout`} )
    //res.redirect('/');
  },

  async username (req, res) {
    if (req.user) {
      const name = await User.findNameByEmail(req.user)
      res.status(200).send( { name:name } )
    }
    else {
      res.status(200).send( { error:`You haven't login yet !` })
    }
  },
}