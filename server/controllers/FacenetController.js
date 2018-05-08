let modelFinish = false;
module.exports = {
	train(req,res){
	let shell = require('shelljs');
    let str = shell.exec('python3 ./facenetTrain/ServerMain.py ', {async:false,silent:false}, function(code, stdout, stderr) {
		let arr = stdout.split("*");
	});
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