
const fs = require("fs")
let count = 0

module.exports = { 
    upload (req,res) {
        fs.writeFile(`./out${count}.png`, req.body.image, 'base64',  err => {
            count ++ 
            if (err) res.status(500),send({
                error: 'an error has occured trying to upload image'
            });
            else res.send({
                success: 'upload image succeed'
            })
        });
    }
}