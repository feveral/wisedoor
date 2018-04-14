const User = require('../models/User')

module.exports = {

  login (req, res) {
    res.send(`Well Come ${req.user}, Have fun !`);
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