let modelFinish = false;
module.exports = {
	train(req,res){
		let shell = require('shelljs');
		let userid = 555;
    let str = shell.exec('python3 ./facenetTrain/ServerMain.py ' + userid, {async:true});
    res.end("start train!");
	},

	checkModelStatus(req,res){
		res.end({"finish": modelFinish});
	},

	modelFinish(req,res){
		modelFinish = true;
		res.end("reply finish is ok");
	}

}