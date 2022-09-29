const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');

//DATABASE MODEL
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true });
let Post;
const Schema = mongoose.Schema;
const postSchema = new Schema({
  text: String;
});
Post = mongoose.model('Post', postSchema)

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('Hi', (ctx) => ctx.reply('Hey there'));
// bot.command('oldschool', (ctx) => ctx.reply('Hello'));
// bot.command('hipster', Telegraf.reply('λ'));

bot.on('message', async (ctx) => {
  ctx.reply(`I hear you say "${ctx.message.text}"`);
  ctx.reply(`I hear you say "${ctx.message.caption}"`);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));