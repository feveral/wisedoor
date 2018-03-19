'use strict';

const PictureManager = require('./PictureManager.js');
const path = require('path');
const url = require('url');

module.exports = class PictureServer{

	constructor(router){
		this.router = router;
		this.pictureManager = new PictureManager();
		this.SetApi();
	}

	SetApi(){
		var self = this;

		self.router.post('/pic',function(req,res){
			console.log("upload!");
			console.log(req.body);
			new PictureManager().TurnOnBulb(req.user);
			res.end("It has been upload!");
		});


	}
}