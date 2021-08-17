let Discord = require("discord.js");
const express = require("express");
const app = express();
const currency = "<:CampK12:809296308765458474>"
app.get("/", (req, res) => {
  res.send("How did you get this link?")
})
var coolDownforbeg = new Set();
var coolDownforbal = new Set();
app.listen(3000, () => {
  console.log("Lets gooo! Its working!");
});
let client = new Discord.Client();
const Database = require("@replit/database")
const db = new Database()
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith("$balance")|| message.content.toLowerCase().startsWith("$bal")){
    if(coolDownforbal.has(message.author.id)){
      message.reply("You have used this command in the last 15 seconds, please wait before using this command again.");
    }else{
      let balance = await db.get(`wallet_${message.author.id}`)
      let bank = await db.get(`bank_${message.author.id}`)
      if(balance === null) balance = 0
      if(bank === null) bank = 0
      let MoneyEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}'s Wallet and Bank`)
      .setDescription(`Wallet: ${balance} ${currency}\nBank: ${bank} ${currency}`)
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(MoneyEmbed)
    }
    coolDownforbal.add(message.author.id)
      setTimeout(() => {
      coolDownforbal.delete(message.author.id)
    }, 15000)
  }
  if(message.content.toLowerCase().startsWith("$beg")){
    if(coolDownforbeg.has(message.author.id)){
      message.reply("you have used this command in the last 15 seconds, please wait before using this command again.")
    }else{
      let random = [90, 98, 69, 119, 500, 0,  183, 123, 150, 100, 123, 123, 90,90,90,90,90,90,100,150,123,98.119, 134, 124]
      let random1 = random[Math.floor(Math.random()*random.length)]
      if(random1 === 0){
      message.reply("Oof, no one donated any money, try again next time :D")
      }else{
        message.reply(`nice! People gave you ${random1} ${currency}!`)
        let balance = await db.get(`wallet_${message.author.id}`)
        let money = balance + random1
        db.set(`wallet_${message.author.id}`, money).then(() => {});
      }
    }
    coolDownforbeg.add(message.author.id) 
      setTimeout(() => {
      coolDownforbeg.delete(message.author.id)
    }, 15000)
  }
  if (message.content.toLowerCase() === "$help") {
    let embed = new Discord.MessageEmbed()
      .setTitle("Commands!")
      .setDescription("This bot is currently in testing mode, if you have any suggestions please send it in <#:824177419858214932:>")
      .addFields({ name: "Ask the virtual people for some donos", value: "`%beg`" },
        { name: "Check up on your coins", value: `$bal` },
        { name: "Buy some stuff here!", value: "`$shop`" })
    message.channel.send(embed)
  }
  if (message.content.toLowerCase() === "$shop") {
    let embed = new Discord.MessageEmbed()
      .setTitle("Shop")
      .setDescription("Please note, no IRL money is involved and you cannot buy IRL stuff from In-Game-Coins. Use `$buy ID` to buy.")
      .addFields({ name: "Piggy Bank (id: piggy)", value: `500 ${currency}` },
        { name: "CampK12 Totem (id: ck12)", value: `1M ${currency}` })
    message.channel.send(embed)
  }
  if (message.content.toLowerCase() === "$info piggy") {
    let embed = new Discord.MessageEmbed()
      .setTitle("Piggy Bank")
      .addFields({ name: "Price", value: `500 ${currency}` },
        { name: "Usage", value: "Use `$dep piggy` to put 1000 <:CampK12:809296308765458474> into your piggy bank! No one....no one will be able to access it! That 1000 <:CampK12:809296308765458474> are safe till you break it with `$piggy break`." })
    message.channel.send(embed)
  }
  if (message.content.toLowerCase() === "$info ck12") {
    let embed = new Discord.MessageEmbed()
      .setTitle("CampK12 Totem")
      .addFields({ name: "Price", value: `1M ${currency}` },
        { name: "Usage", value: "`$campk12` gets you 1k coins when you have this! There is a 3 hour cooldown though. Other than that, its just a flex tbh." })
      .setFooter("You guys actually read footers? Cool.")
    message.channel.send(embed)
  }
  if (message.content.toLowerCase() === "$buy piggy") {
    let wallet = await db.get(`wallet_${message.author.id}`);
    let hasPiggy = await db.get(`piggy_${message.author.id}`);
    if (hasPiggy != "yes") {
      if (wallet < 500) {
        message.reply(`you don't have 500 ${currency}. You can't buy the piggy bank yet.`);
      } else {
        let moneyLeft = wallet - 500;
        db.set(`wallet_${message.author.id}`, moneyLeft).then(() => { });
        db.set(`piggy_${message.author.id}`, "yes").then(() => { });
        message.reply("you now have a piggy bank!");
      }
    } else {
      message.reply("you already have the piggy bank.")
    }
  }
  if (message.content.toLowerCase() === "$dep") {
    let wallet = await db.get(`wallet_${message.author.id}`);
    let bank = await db.get(`bank_${message.author.id}`);
    db.set(`bank_${message.author.id}`, wallet).then(() => { });
    db.set(`wallet_${message.author.id}`, 0).then(() => { });
    message.reply(`${wallet} ${currency} has been added your bank!`);
  }
  if (message.content.toLowerCase() === "$dep piggy") {
    let hasPiggy = await db.get(`piggy_${message.author.id}`)
    let wallet = await db.get(`wallet_${message.author.id}`)
    if (hasPiggy != "yes") {
      message.reply("you need to buy the piggy bank to use that command!");
    } else {
      let piggyMoney = await db.get(`piggyMoney_${message.author.id}`)
      if (piggyMoney != 1000) {
        if (wallet < 1000) {
          let final1PiggyMoney = piggyMoney + wallet;
          if (final1PiggyMoney >= 1000) {
            let extra = final1PiggyMoney - 1000;
            let finalPiggyMoney = final1PiggyMoney - extra;
            db.set(`piggyMoney_${message.author.id}`, finalPiggyMoney).then(() => { });
            db.set(`wallet_${message.author.id}`, extra).then(() => { });
            wallet = extra;
            message.reply(`You have maxed out your Piggy Bank now! Your wallet now has ${wallet} ${currency}.`);
          }else if(piggyMoney === 1000){
            message.reply("your piggy is already maxed!")
          }else {
            let moneh = piggyMoney + wallet;
            db.set(`piggyMoney_${message.author.id}`, moneh).then(() => { });
            db.set(`wallet_${message.author.id}`, 0).then(() => { });
            message.reply(`Your piggy bank now has ${moneh} ${currency} in it and your wallet now has 0 ${currency}`);
          }
        }else if(wallet === 1000){
          let final1PiggyMoney = piggyMoney + wallet;
          if(final1PiggyMoney >= 1000){
            let extra = final1PiggyMoney - 1000;
            let finalPiggyMoney = final1PiggyMoney - extra;
            db.set(`piggyMone_${message.author.id}`, finalPiggyMoney).then(() => {});
            db.set(`wallet_${message.author.id}`, extra).then(() => { });
            wallet = extra;
            message.reply(`You have maxed out your Piggy Bank now! Your wallet now has ${wallet} ${currency}.`);
          }else{
            db.set(`piggyMoney_${message.author.id}`, wallet).then(() => { });
            db.set(`wallet_${message.author.id}`, 0).then(() => { });
            message.reply(`Your piggy bank now has ${wallet} ${currency} in it and your wallet now has 0 ${currency}`);
          }
        }else{
          let final1PiggyMoney = piggyMoney + wallet;
          let extra = final1PiggyMoney - 1000;
          let finalPiggyMoney = final1PiggyMoney - extra;
          db.set(`piggyMone_${message.author.id}`, finalPiggyMoney).then(() => {});
          db.set(`wallet_${message.author.id}`, extra).then(() => { });
          wallet = extra;
          message.reply(`You have maxed out your Piggy Bank now! Your wallet now has ${wallet} ${currency}.`);
        }
      }
    }
  }
  if(message.content.toLowerCase()==="$piggy break"){
    let hasPiggy = await db.get(`piggy_${message.author.id}`);
    let piggyMoney = await db.get(`piggyMoney_${message.author.id}`);
    if(hasPiggy != "yes"){
      message.reply("you don't have a piggy bank. Get one in the shop.");
    }else{
      db.set(`piggy_${message.author.id}`, "bah").then(() => {});
      let wallet = await db.get(`wallet_${message.author.id}`);
      let moneh = piggyMoney + wallet;
      db.set(`piggyMoney_${message.author.id}`, 0).then(() => {});
      db.set(`wallet_${message.author.id}`, moneh).then(() => {});
      message.reply(`you broke your piggy and got ${piggyMoney} into your wallet!`)
    }
  }
  if(message.content === "$reset"){
    db.set(`wallet_${message.author.id}`, 0).then(() => {});
    db.set(`bank_${message.author.id}`, 0).then(() => {});
  }
  if(message.content.toLowerCase() === "$with"){
    var wallet = await db.get(`wallet_${message.author.id}`);
    var bank = await db.get(`bank_${message.author.id}`);
    var moneh = wallet + bank;
    db.set(`wallet_${message.author.id}`, moneh).then(() => {});
    db.set(`bank_${message.author.id}`, 0).then(() => {});
    message.reply(`you withdrew ${bank} from your bank account. You now have ${moneh} in your wallet!`);
  }
})

const mySecret = process.env['TOKEN']
client.login(mySecret);
