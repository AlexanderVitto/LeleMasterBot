const MongoClient = require('mongodb').MongoClient;
const Promise = require('promise');
const url = config.from_config('default','mongoDB');

MongoClient.connect(url,{ useNewUrlParser: true}, function(err, client){
    if(err) throw err;
    var dbo = client.db("test");
    // var myObj = [
    //     {key  : "nc" ,value : "nc mind ♥️"},
    //     {key  : "mbut" ,value : "cangkeme ra di sekolahke"},
    //     {key  : "asu" ,value : "tutuke di jaga"},
    //     {key  : "larang" ,value : "wis kerja kok isih nyebut larang"},
    //     {key  : "lele" ,value : "Lakad Matataag"}
    // ];

    // dbo.collection("dictionary").insertMany(myObj, function(err, res){
    //     if(err) throw err;
    //     console.log("Number of documents inserted: "+res.insertedCount);
    // });
    dbo.collection("dictionary").find({key : "nc"},{projection:{ _id: 0, value: 1 }}).toArray(function(err, result) {
        if (err) throw err;
        for(var i in result){
            console.log();
        }
       
    });

    client.close();
    // dbo.collection("dictionary").find({}, { _id: 0, key: 1, value: 0}).toArray(function(err, result){
    //     if(err) throw err;
    //     console.log(result);
    // });
    // client.close();
});