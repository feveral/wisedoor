const User = require('../models/User')

module.exports = {

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
      res.send( { name:name,email:req.user } )
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