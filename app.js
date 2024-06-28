const {Telegraf} = require('telegraf');
var QRCode = require('qrcode')
const fs = require("fs");

var basesix = "dgdfgfdg"


require("dotenv").config();

const TOK = process.env.TOKEN;
const bot =  new Telegraf(TOK);

bot.start((ctx) => ctx.reply('Welcome'))    
bot.use(async(ctx, next) => {
    getqrcode(ctx.update.message.text)
    setTimeout(function() {
        next();
    }, 3000);
})

bot.use(async(ctx, next) => {
    // await ctx.reply(JSON.stringify(getqrcode(ctx.update.message.text), null, 2));
    await ctx.replyWithPhoto({source: basesix})
})

function getqrcode(text){
    QRCode.toDataURL(text, function (err, url) {
        // console.log(url.substr(url.indexOf(',') + 1))
        basesix = Buffer.from(url.substr(url.indexOf(',') + 1), 'base64');
      })
}

bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))