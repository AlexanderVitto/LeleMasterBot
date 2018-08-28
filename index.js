const TelegramBot = require('node-telegram-bot-api');
const Promise = require('promise');
const config = require('./lib/_config');
const db = require('./lib/_dbConnection');
const MongoClient = require('mongodb').MongoClient;
const token = config.from_config('default','bot API');
const url = config.from_config('default','mongoDB');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var datetime = new Date(); 
var mq= 0;
var dict= null;

db.dbRead(function(result){
  dict=result;
});


bot.on('message', (msg) => {
  console.log(msg);
  var count = 0;
  if(msg.hasOwnProperty('text')){
    
    if(msg.text.toString().charAt(0)=='/'){
      
      bot.onText(/\/kampul kang (.+)/, function(msg,match){
        if(count==0){
          var id = msg.chat.id;
          var key = match[1].split("_")[0];
          var value = match[1].split("_")[1];
          
          var duplicate = false;

          for(var i in dict){
            if(key.toLowerCase() == dict[i]["key"]){
              duplicate=true;
            }
            
          }
          
          if(!duplicate){
            var addToCache = new Promise(function(resolve){
              db.dbCreate(key, value, function(){
                resolve("ok"); 
              });
            });
  
            addToCache.then(function(){
              db.dbRead(function(result){
                dict = result;
                bot.sendMessage(id,"Terimakasih atas ilmunya");
              });
            });
          }else{
            bot.sendMessage(id,"Uwis ngerti");
          }
          
          count++;
        }
      });

      bot.onText(/\/ganti kang (.+)/, function(msg,match){
        if(count==0){
          var id = msg.chat.id;
          var key = match[1].split("_")[0];
          var value = match[1].split("_")[1];
          var duplicate = false;

          for(var i in dict){
            if(key.toLowerCase() == dict[i]["key"]){
              duplicate=true;
            }
            
          }
          
          if(duplicate){
            var addToCache = new Promise(function(resolve){
              db.dbUpdate(key, key, value, function(){
                resolve("ok"); 
              });
            });
  
            addToCache.then(function(){
              db.dbRead(function(result){
                dict = result;
                bot.sendMessage(id,"Ok sipp");
              });
            });
          }else{
            bot.sendMessage(id,"Durung pesen kw");
          }
          
          count++;
        }
      });

    }else{
      
      var chatId = msg.chat.id;
      var message = msg.text.toString().split(" ");
      var isSend = false;
      
      for(var i in message){
        
        for(var k in dict){
          var key = dict[k]["key"];
         
          if (message[i].toLowerCase() == key) {
              send(chatId,k);
              isSend=true;
          } 
        }
      }

      if(!isSend){
        for(var k in dict){
          var key = dict[k]["key"];
         
          if (msg.text.toString().toLowerCase() == key) {
              send(chatId,k);
          } 
        }
      }
    }
      
    
  }else if(msg.hasOwnProperty('document')){

  }else if(msg.hasOwnProperty('sticker')){

  }else if(msg.hasOwnProperty('photo')){

  }else{

  }
  
});

function timeOut(){
  setTimeout(()=>{mq=0;}, 60000);
};

function send(id, key){
  mq++;
  
  if(mq==1){
    timeOut();
  }
  if(mq<19){
    console.log(id,key);
    try{
      bot.sendMessage(id, dict[key]["value"]); 
    }catch(err){
      console.log(JSON.stringify(err));
    }
  } 
  
};