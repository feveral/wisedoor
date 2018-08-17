const User = require('../models/User')

module.exports = {

  async authenticate (req, res, next) {
    const userEmail = req.body.email
    const userPassword = req.body.password
    try {
      if (!User.IsSignInCorrect(userEmail, userPassword)) {
        res.send({ error: 'wrong email or password' })
      }
    } catch (error) {
      res.send({ error: 'wrong email or password' })
    }
    next()
  },

  async login (req, res) {
    const name = await User.findNameByEmail(req.user)
    res.send( { success:true,name:name } )
  },  

  logout (req, res) {
    req.logout();
    res.send( { success:`You've successfully logout`} )
    //res.redirect('/');
  },

  async username (req, res) {
    if (req.user) {
      const name = await User.findNameByEmail(req.user)
      res.send( { name:name } )
    }
    else {
      res.send( { error:`You haven't login yet !` })
    }
  },

  Islogin (req, res, next) {
    if (req.user) {
      next()
    }
    else {
      console.log('user not login')
      res.send({error:'You Should login in'})
    }
  }
}