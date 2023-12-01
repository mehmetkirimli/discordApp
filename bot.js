const Discord = require("discord.js");
const client = new Discord.Client();
const DutyService = require("./manager");
require("dotenv").config();

client.on("ready", () => {
  console.log(`Bot ${client.user.tag} has been ready and connected.`);
});

client.on("message", (msg1) => {
  if (msg1.content === "Hello") {
    msg1.channel.send("Hello Everyone :) ");
  }
});

client.on("message", async (sms) => {
  const current = sms.content.split(" ");
  if (!current[1]) {
    sms.channel.send("Hatalı Kullanım : Örnek Kullanım => get 26.04.2020");
  } else {
    const tarih = current[1];
    if (current.shift() === "get") {
      try {
        const result = await DutyService.getOne(tarih);
        sms.channel.send(`${result.infoDate} -> ${result.responsible} , ${result.category}`);
      } catch (Err) {
        console.log(err);
      }
    }
  }
});

// client.on("message", async (msg2) => {
//   if (msg2.content === "getAll") {
//     const today = await DutyService.getAll();
//     msg2.channel.send(today);
//   }
// });

client.login(process.env.DISCORD_API_TOKEN);
