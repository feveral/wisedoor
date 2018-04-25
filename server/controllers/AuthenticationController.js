const User = require('../models/User')

module.exports = {

  async login (req, res, next) {
    const name = await User.findNameByEmail(req.user)
    res.send( {success:true,name:name} );
  },  

  logout (req, res) {
    req.session.destroy();
    res.redirect('/');
  },

  async username (req, res) {
    const name = await User.findNameByEmail(req.user)
    res.send( JSON.stringify( name ))
  }
}