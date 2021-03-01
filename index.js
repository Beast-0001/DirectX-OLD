const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
var timeStamp = Date.now;
client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
  client.user.setActivity("+help to start", {
    type: "STREAMING",
    url: "https://www.twitch.tv/beastatfnbr"
  });
});

client.on("message", receivedMessage => {
  if (receivedMessage.author == client.user) {
    // Prevent bot from responding to its own messages
    return;
  }

  if (receivedMessage.content.startsWith("+")) {
    processCommand(receivedMessage);
  }
});

function doMagic8BallVoodoo(receivedMessage) {
  var rand = [
    "Yes",
    "No",
    "Why are you even trying?",
    "What do you think? NO",
    "Maybe",
    "Never",
    "Yep",
    "I wouldnt do that if I were you"
  ];
  var randomMessage = rand[Math.floor(Math.random() * rand.length)];
  receivedMessage.channel.send(randomMessage);
}

function weather(arguments, receivedMessage) {
  var q = arguments;
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    q +
    "&APPID=7f4b3f7c110c3e5a77f871002fb55792"; //To Get AppID, go to https://openweathermap.org/appid

  request(url, function(e, r, b) {
    var p = JSON.parse(b);
    console.log(p);
    if (p.main != undefined) {
      console.log(
        receivedMessage.author.username +
          " from " +
          receivedMessage.author.channel +
          " requested the weather (" +
          Date.now() +
          ")"
      );
      const ME = {
        embed: {
          color: 3447003,
          title: "🏙️Weather of " + p.name + "🏙️",
          description: "Weather",

          fields: [
            {
              name: "Weather",
              value: p.weather[0].description
            },

            {
              name: "🌡️temp🌡️",
              value: Math.round(kelToFar(p.main.temp)) + "°F"
            },
            {
              name: "🔼High of🔼",
              value: Math.round(kelToFar(p.main.temp_max)) + "°F"
            },
            {
              name: "🔽low of🔽",
              value: Math.round(kelToFar(p.main.temp_min)) + "°F"
            },
            {
              name: "💨Humidity💨",
              value: p.main.humidity + "%"
            }
          ],

          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© DirectX"
          }
        }
      };
      receivedMessage.channel.send(ME);
    } else {
      receivedMessage.channel.send("Code 404 City Not found");
      receivedMessage.channel.send("🚫❌🚫");
    }
  });
}

function restart(receivedMessage) {
  receivedMessage.channel.send("Please press ALT + F4 and join");
}

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
  let zipCode = receivedMessage.content.split(" ")[1];
  let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

  console.log("Command received: " + primaryCommand);
  console.log("Arguments: " + arguments); // There may not be any arguments

  if (primaryCommand == "help") {
    helpCommand(arguments, receivedMessage);
  } else if (primaryCommand == "multiply") {
    multiplyCommand(arguments, receivedMessage);
  } else if (primaryCommand == "add") {
    addCommand(arguments, receivedMessage);
  } else if (primaryCommand == "sub") {
    subCommand(arguments, receivedMessage);
  } else if (primaryCommand == "divide") {
    divideCommand(arguments, receivedMessage);
  } else if (primaryCommand == "ping") {
    pingCommand(receivedMessage);
  } else if (primaryCommand == "8ball") {
    doMagic8BallVoodoo(receivedMessage);
  } else if (primaryCommand == "weather") {
    weather(arguments, receivedMessage);
  } else if (primaryCommand == "reset") {
    restart(receivedMessage);
  } else if (primaryCommand == "stopwatch") {
    stopwatch(arguments, receivedMessage);
  } else if (
    receiveMessage.content.includes("http://") ||
    receivedMessage.content.includes("https://")
  ) {
    receivedMessage.delete();
    receivedMessage.channel.send("🚫No links/invites!🚫");
  } else {
    receivedMessage.channel.send(
      "I don't understand the command. Try `help` or `+multiply`"
    );
  }
}

function pingCommand(receivedMessage) {
  receivedMessage.channel.send("Pinging...").then(m => {
    let ping = m.createdTimestamp - receivedMessage.createdTimestamp;
    m.edit(
      `Pong!🏓 __**Bot Latency:**__ ${ping}ms, __**API Latency:**__ ${Math.round(
        client.ws.ping
      )}ms`
    );
  });
}
function URL(receivedMessage) {
  if (
    message.content.includes("http://") ||
    message.content.includes("https://")
  ) {
    receivedMessage.delete();
    receivedMessage.channel.send("🚫No links/invites!🚫");
  }
}
function stopwatch(arguments, receivedMessage) {
  if (arguments == "start") {
    receivedMessage.channel.send("Create timetamp start watch: " + timeStamp);
    timeStamp = receivedMessage.createdTimestamp;
    receivedMessage.channel.send("🕗StopWatch Started🕗");
    receivedMessage.channel.send("Create timetamp start watch 2: " + timeStamp);
  }
  if (arguments == "stopw") {
    var i = Date.now() - timeStamp;
    receivedMessage.channel.send("Dste now:   " + Date.now);
    receivedMessage.channel.send("Create timetamp : " + timeStamp);
    receivedMessage.channel.send("i:   " + i);
    receivedMessage.channel.send(
      "Elapsed time:" + roundToTwo(i / 1000) + "seconds"
    );
  }
}

function convertMiliseconds(miliseconds, format) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  switch (format) {
    case "s":
      return total_seconds;
    case "m":
      return total_minutes;
    case "h":
      return total_hours;
    case "d":
      return days;
    case "a":
      return days, hours, minutes, seconds;
  }
}

function helpCommand(arguments, receivedMessage) {
  const M = {
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Help With DirectX",
      title: "Help With Commands",
      url: "https://github.com/thebeastatelectricity/DirectX/",
      description: "This will show all of the commands and what they can do",
      fields: [
        {
          name: "`+multiply 0 10.2`",
          value:
            "- Put any numbers instead of 0 and 10.2 to multiply numbers. add a space between the numbers"
        },
        {
          name: "`+add 2 2.8`",
          value:
            "- Put any numbers instead of 2 and 2.8 to add numbers. add a space between the numbers"
        },
        {
          name: "`+sub 10 2.4`",
          value:
            "- Put any numbers instead of 10 and 2.4 to subtract numbers. add a space between the numbers"
        },
        {
          name: "`+divide 8 4`",
          value:
            "- Put any numbers instead of 8 and 4 to divide numbers. add a space between the numbers"
        },
        {
          name: "`+weather <your zipCode>`",
          value: "- Put your zip code"
        },
        {
          name: "Issues?",
          value:
            " [Report Them Here!](https://github.com/thebeastatelectricity/DirectX/issues) "
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© DirectX"
      }
    }
  };
  receivedMessage.reply("K I'll DM you as soon as I can with the Info!");
  receivedMessage.author.send(M);
}

function multiplyCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send(
      "Not enough values to multiply. Try `+multiply 2 4 10` or `+multiply 5.2 7`"
    );
    return;
  }
  let product = 1;
  arguments.forEach(value => {
    product = product * parseFloat(value);
  });
  receivedMessage.channel.send(
    "The product of " +
      arguments +
      " multiplied together is: " +
      product.toString()
  );
}

function divideCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send(
      "Not enough values to divide. Try `+dividing 2 4 10` or `+dividing 5.2 7`"
    );
    return;
  }
  let timesplayed = 0;
  let quotient = 1;
  arguments.forEach(value => {
    if (timesplayed == 0) {
      quotient = value;
    } else {
      quotient = quotient / value;
    }
    timesplayed = timesplayed + 1;
    quotient = roundToTwo(quotient);
  });

  receivedMessage.channel.send(
    "The divisor of " +
      arguments +
      " divided together is: " +
      quotient.toString()
  );
}

function addCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send(
      "Not enough values to add. Try `+adding 2 4 10` or `+adding 5.2 7`"
    );
    return;
  }
  let add = 0;
  arguments.forEach(value => {
    add = add + parseFloat(value);
  });
  receivedMessage.channel.send(
    "The addition of " + arguments + " added together is: " + add.toString()
  );
}

function subCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send(
      "Not enough values to subtract. Try `+ubtracting 2 4 10` or `+subtracting 5.2 7`"
    );
    return;
  }
  let sub = 0;
  let cnt = 0;
  arguments.forEach(value => {
    if (parseFloat(value) > sub && sub == 0) {
      if (cnt > 0 && sub == 0) {
        sub = sub - parseFloat(value);
      } else {
        sub = parseFloat(value) - sub;
      }
    } else {
      sub = sub - parseFloat(value);
    }
    cnt = cnt + 1;
  });
  receivedMessage.channel.send(
    "The subtraction of " + arguments + " subtracted is: " + sub.toString()
  );
}

function kelToFar(kel) {
  kel = parseFloat(kel);
  return (kel * (9 / 5) - 459.67).toString();
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token =
  "xxxxxxxxx";

client.login(bot_secret_token);
