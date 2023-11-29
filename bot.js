const Discord = require("discord.js");
const client = new Discord.Client();
const DutyService = require("./manager");

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
  const tarih = current[1];
  if (current.shift() === "get") {
    const result = await DutyService.getOne(tarih);

    console.log("KKKKKKK", result);
    sms.channel.send(result.nameSurname);
  }
});

client.login("MTE3OTQzMjk3MTMzODUxNDQ4Mw.GJ1mfI.Zkul8N06tIMwrkVbkcMhpM6bhPSvbH4rxqZpKo");
