const {Telegraf} = require('telegraf');
// const { Composer } = require('micro-bot')
var QRCode = require('qrcode')
const fs = require("fs");

var basesix = "dgdfgfdg"


require("dotenv").config();

const TOK = process.env.TOKEN;
const bot =  new Telegraf(TOK);
const blockedUsers = new Set();

bot.start((ctx) => ctx.reply('Welcome to our QR code generator bot. where you can send me any text and i will convert it to qr code. developed by madA'))    
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

bot.command('stop', async (ctx) => {
  blockedUsers.add(ctx.from.id);
  await ctx.reply("You have stopped the bot. Send /start to use it again.");
});

function getqrcode(text){
    QRCode.toDataURL(text, function (err, url) {
        // console.log(url.substr(url.indexOf(',') + 1))
        basesix = Buffer.from(url.substr(url.indexOf(',') + 1), 'base64');
      })
}

bot.launch()
// module.exports = bot


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))