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

const today = DutyService.formatDateString(new Date());
client.on("message", async (msg2) => {
  if (msg2.content.toLowerCase() === "today") {
    const result = await DutyService.getOne(today);
    msg2.channel.send(`${result.infoDate} -> ${result.responsible} , ${result.category}`);
  }
});

client.on("message", async (sms) => {
  const current = sms.content.split(" ");

  const tarih = current[1];
  if (current.shift() === "get") {
    try {
      const result = await DutyService.getOne(tarih);
      if (result) {
        sms.channel.send(`${result.infoDate} -> ${result.responsible} , ${result.category}`);
      } else {
        sms.channel.send("Hatalı Kullanım : Örnek Kullanım => get 26.4.2024");
      }
    } catch (err) {
      console.log(err);
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
