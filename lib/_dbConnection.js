const MongoClient = require('mongodb').MongoClient;
const config = require('./_config');
const Promise = require('promise');
const url = config.from_config('default','mongoDB');
const folder = __dirname;

module.exports.dbCreate = function(key, value, callback){
    MongoClient.connect(url,{ useNewUrlParser: true}, function(err, client){
        if(err) throw err;
        var dbo = client.db("test");
        
        var obj = {key : key, value : value};
        dbo.collection("dictionary").insertOne(obj, function(err, res){
            if(err) throw err;
            callback();
            client.close();
        });
    });     
    
}

module.exports.dbRead = function(callback){
    MongoClient.connect(url,{ useNewUrlParser: true}, function(err, client){
        if(err) throw err;
        var dbo = client.db("test");
        
        dbo.collection("dictionary").find({}, {projection:{ _id: 0, key: 1, value: 1 }}).toArray(function(err, result) {
            if (err) throw err;
            // dataCache._value=result;
            // console.log(JSON.stringify(dataCache.getValue()));
            callback(result);
            client.close();
        });
    });
}

module.exports.dbUpdate = function(key, newKey, newValue, callback){
    MongoClient.connect(url,{ useNewUrlParser: true}, function(err, client){
        if(err) throw err;
        var dbo = client.db("test");

        var query = {key : key};
        var newValues = {$set : {key : newKey, value : newValue}};
        dbo.collection("dictionary").updateOne(query, newValues, function(err, result) {
            if (err) throw err;
            
            callback();
            client.close();
        });
    });
}

module.exports.dbDelete = function(key){
    MongoClient.connect(url,{ useNewUrlParser: true}, function(err, client){
        if(err) throw err;
        var dbo = client.db("test");

        var query = {key : key};
        dbo.collection("dictionary").deleteOne(query, function(err, result) {
            if (err) throw err;
            
            client.close();
        });
    });
}
