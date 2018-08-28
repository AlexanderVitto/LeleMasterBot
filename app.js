const TelegramBot = require('node-telegram-bot-api');
const config = require('./lib/_config');

// replace the value below with the Telegram token you receive from @BotFather
const token = '565767048:AAFAW25yKkRlO_Jv3OZX6X1QsjDzkrxGOyE';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var current_player = 0;
var player_name = new Array();

bot.on('message', function(msg){
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,JSON.stringify(msg.chat));
});

bot.onText(/\/start/, function(msg){
    //console.log(JSON.stringify(msg));
    bot.sendMessage(
        msg.chat.id,
        "Hi <b>" + msg.from.first_name + "</> " + msg.from.last_name + "\ncurrent member "+current_player,
        {
            parse_mode: "HTML"
        }
    );
});

bot.onText(/\/join/, function(msg){
    //console.log(JSON.stringify(msg));
    var total_player_name = "";

    player_name.push(msg.from.username);
    console.log(JSON.stringify(player_name));
    player_name.forEach(element => {
        console.log(JSON.stringify(element));
        total_player_name += element;
    });

    bot.sendMessage(
        msg.chat.id,
        "" + total_player_name +" \ncurrent member "+current_player,
        {
            parse_mode: "HTML"
        }
    );
});


// bot.onText( /\/play (.+)/, function( msg, match ) {
    
//     var fromId = msg.from.id;

//     switch( match[1] ) {

//         case "tigapuluh":

//             bot.sendGame(

//             fromId,

//             "tigapuluh",

//             {

//                 reply_markup: JSON.stringify({

//                     inline_keyboard: [

//                         [ { text: "Play", callback_game: JSON.stringify( { game_short_name: "tigapuluh" } ) } ],

//                         [ { text: "Share", url: "http://t.me/LeleMasterBot?game=tigapuluh" } ]

//                     ]

//                 })

//             }

//         );

//         break;

//     default:

//         bot.sendMessage( fromId, "Sorry " + msg.from.first_name + ", but this game doesn’t exist.." );

// }

// } );

// bot.on( "callback_query", function( cq ) {

//     if ( cq.game_short_name ) {
  
//         switch( cq.game_short_name ) {
  
//             case "tigapuluh":
//                 bot.answerCallbackQuery( cq.id, undefined, false, { url: "URL_DE_NUESTO_JUEGO" } );
  
//                 return;
  
//         }
  
//         bot.answerCallbackQuery( cq.id, "Sorry, '" + cq.game_short_name + "' is not available.", true );
  
//     }
  
//   } );

//   bot.on( "inline_query", function( iq ) {

//     bot.answerInlineQuery( iq.id, [ { type: "game", id: "0", game_short_name: "tigapuluh" } ] );
  
//   } );