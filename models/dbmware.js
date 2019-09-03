
var mongoose = require('mongoose');

var schema = mongoose.Schema;

module.exports = function(){
    return function(req, res, next){

        const MongoClient = require('mongodb').MongoClient;
        const uri ="---dummy---"; /*line for MongoDB connection uri*/ 
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
        if(err)
            throw err;
    
        const collection = client.db("clouddb").collection("collection0");
        
        var result = Object.values(req.body);
        collection.insertOne({email: result[0], password: result[1], confirm_pass: result[2]});
        // res.send("200 OK");
        client.close();
        });

    next();
    };
};