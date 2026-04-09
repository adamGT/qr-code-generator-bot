const {Telegraf} = require('telegraf');
// const { Composer } = require('micro-bot')
var QRCode = require('qrcode')
const fs = require("fs");

var basesix = "dgdfgfdg"


require("dotenv").config();

const TOK = process.env.TOKEN;
const bot =  new Telegraf(TOK);
const blockedUsers = new Set();

bot.start(async (ctx) => {
    if (blockedUsers.has(ctx.from.id)) {
    await ctx.reply('"Welcome back! to our QR code generator bot. where you can send me any text and i will convert it to qr code. /n developed by madA')
    return;
    }
    
    await ctx.reply('Welcome to our QR code generator bot. where you can send me any text and i will convert it to qr code. /n developed by madA')
});

bot.command('stop', async (ctx) => {  
    blockedUsers.add(ctx.from.id);
   await ctx.reply("You have stopped the bot. Send /start to use it again.");
});

bot.use(async(ctx, next) => {
    if (!ctx.update.message || !ctx.update.message.text) return;
    if (ctx.update.message.text.startsWith('/')) return;
    if (blockedUsers.has(ctx.from.id)) {
        await ctx.reply("You stopped the bot. Send /start to use it again."); 
        return;
    }

    getqrcode(ctx.update.message.text)
    setTimeout(function() {
        next();
    }, 3000);
})

bot.use(async(ctx, next) => {
    if (!ctx.update.message || !ctx.update.message.text) return;
    if (ctx.update.message.text.startsWith('/')) return;
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