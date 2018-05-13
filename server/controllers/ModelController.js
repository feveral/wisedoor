var fs = require('fs');

module.exports = {
  GetNewModel(req, res) {
    fs.readFile("./facenetTrain/models/tom_strength_classifier.pkl", (err, data)=>{
      res.send(data);
    });      
  }
}