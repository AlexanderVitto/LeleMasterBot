const TelegramBot = require('node-telegram-bot-api');
const Promise = require('promise');
const config = require('./lib/_config');
const db = require('./lib/_dbConnection');
<<<<<<< HEAD
const MongoClient = require('mongodb').MongoClient;
const token = config.from_config('default','bot API');
const url = config.from_config('default','mongoDB');
=======
const token = config.from_config('default','bot API');
var fs = require('fs');
var xml2js = require('xml2js');
>>>>>>> Add asset

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var parser = new xml2js.Parser();
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
<<<<<<< HEAD
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
=======
        }
      });

      bot.onText(/\/join kang/, function(msg, match){
        var id = msg.chat.id;
        bot.sendMessage(id,"Siap!!! \nTerimakasih atas ilmunya");
      });

      bot.onText(/\/ganti kang (.+)/, function(msg, match){
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
      var chatFrom = msg.from.id;
>>>>>>> Add asset
      var message = msg.text.toString().split(" ");
      var isSend = false;
      
      for(var i in message){
        
        for(var k in dict){
          var key = dict[k]["key"];
         
          if (message[i].toLowerCase() == key) {
<<<<<<< HEAD
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
=======
              send(chatId, chatFrom, k);
              isSend=true;
          } 
        }
      }

      if(!isSend){
        for(var k in dict){
          var key = dict[k]["key"];
         
          if (msg.text.toString().toLowerCase() == key) {
              send(chatId, chatFrom, k);
          } 
        }
      }
>>>>>>> Add asset
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

<<<<<<< HEAD
function send(id, key){
=======
function send(id, idFrom, key){
>>>>>>> Add asset
  mq++;
  
  if(mq==1){
    timeOut();
  }
  if(mq<19){
    console.log(id,key);
    try{
<<<<<<< HEAD
=======
      card(idFrom);
>>>>>>> Add asset
      bot.sendMessage(id, dict[key]["value"]); 
    }catch(err){
      console.log(JSON.stringify(err));
    }
  } 
  
<<<<<<< HEAD
};
=======
};

function card(id){
  fs.readFile(__dirname + '/config/asset.xml', function(err, data) {
      parser.parseString(data, function (err, result) {
        var cardPack = Object.keys(result['card']);
        
        //Shuffle card
        for(var k = 0; k < cardPack.length; k++){
          var rand = (Math.floor(Math.random() * (51 - k + 1)) + k);
          //console.log(rand);
          // console.log(cardPack[rand]);
          var temp = cardPack[rand];
          cardPack[rand] = cardPack[k];
          cardPack[k] = temp;
        }
        //console.log(cardPack);
        //myId 229583543
        var player = [['229583543']];
        var index = 0;
        for(var i=0; i < 3; i++){
          for(var j=0; j < player.length; j++){
            player[j].push(cardPack[index]);
            bot.sendPhoto(player[j][0],'./'+result['card'][cardPack[i]].toString());
            index++;
          }
        }
        
        console.log(player);
        
      });
  });
};

>>>>>>> Add asset
