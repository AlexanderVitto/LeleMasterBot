const TelegramBot = require('node-telegram-bot-api');
const config = require('./lib/_config');
var fs = require('fs');
var xml2js = require('xml2js');


// replace the value below with the Telegram token you receive from @BotFather
const token = config.from_config('default','bot API');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var parser = new xml2js.Parser();
var datetime = new Date(); 
var mq = 0;

bot.on('message', (msg) => {
    console.log(msg);

  if(msg.hasOwnProperty('text')){
    const chatId = msg.chat.id;
    var message = msg.text.toString().split(" ");
    
    var dict = config.from_config('dictionary','text');

    for(var i in message){

      for(var k in dict){

        if (message[i].toLowerCase() == k) {
          mq++;

          if(mq==1){
            timeOut();
          }
          if(mq<19){
            if(msg.chat.title.toString() != "TI2D"){
                card(msg.from.id,'c1');
            }
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

function card(id,key){
    fs.readFile(__dirname + '/config/asset.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            console.log(result['card'][key].toString());
            bot.sendPhoto(id,'./'+result['card'][key].toString());
        });
    });
}
