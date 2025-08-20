# DubstepMad API Wrapper

[![npm version](https://img.shields.io/npm/v/@dubstepmad/dubstepmad-api-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/@dubstepmad/dubstepmad-api-wrapper)
[![build](https://img.shields.io/github/actions/workflow/status/dubstepmad/dubstepmad-api-wrapper/publish.yml?branch=main&style=flat-square)](https://github.com/dubstepmad/dubstepmad-api-wrapper/actions/workflows/publish.yml)
[![license](https://img.shields.io/npm/l/@dubstepmad/dubstepmad-api-wrapper.svg?style=flat-square)](https://github.com/dubstepmad/dubstepmad-api-wrapper/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@dubstepmad/dubstepmad-api-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/@dubstepmad/dubstepmad-api-wrapper)

---

## Installation

```bash
npm install @dubstepmad/dubstepmad-api-wrapper
```

## Examples

### Random memes command, no input example
```bash
const dubstepmad_api = require('dubstepmad-api-wrapper')
const Discord = require('discord.js')

const Image = await noodles_api.randommeme()
let  embed = new Discord.MessageEmbed()
	.attachFiles([{name:  "meme.png",  attachment:Image}])
	.setImage('attachment://meme.png')
message.channel.send(embed)
```

### Lisa-Stage command, 1 text input example
```bash
const dubstepmad_api = require('dubstepmad-api-wrapper')
const Discord = require('discord.js')

let text = args.toString().replace(/,/g,  '  ')
let Image = await dubstepmad_api.lisastage(text)
  
const attachment = new Discord.MessageAttachment(Image);
message.channel.send(attachment);
```

### Drake command, more than one text input example
```bash
const dubstepmad_api = require('dubstepmad-api-wrapper');

let text1 = args.toString().split('/')[0].replace(/,/g,  '  ')
let text2 = args.toString().split('/')[1].replace(/,/g,  '  ')

let Image  =  await dubstepmad_api.drake(text1,  text2)
const attachment = new Discord.MessageAttachment(Image);

message.channel.send(attachment);
```

### Trash command, image input example
```bash
let Discord = require("discord.js");
const dubstepmad_api = require('dubstepmad-api-wrapper')

let user = message.mentions.users.first() || message.author
let result = user.displayAvatarURL()

let Image = await  dubstepmad_api.trash(result)

const attachment = new Discord.MessageAttachment(Image);
message.channel.send(attachment);
```

### Balance card command, for more than 2 inputs example
```bash
let Discord = require("discord.js");
const dubstepmad_api = require('dubstepmad-api-wrapper')

let Image = await new dubstepmad_api.balancecard() //You first make the variable
.setBackground(background) //then set all the arguments like so
.setAvatar(avatar)
.setTitle(title)
.setText1(text1)
.setText2(text2)
.setTextColor(textcolor) //in hex
.build() //and when your done, .build() it


let embed= new Discord.MessageEmbed()
  embed.setTitle(`Here is your balance ${message.author.username}!!`)
  embed.attachFiles([{name: "balance.png", attachment:Image}])
  embed.setImage('attachment://balance.png');
  embed.setColor(process.env.EMBEDCOLOR)
  embed.setFooter('Using Noodles API')
message.channel.send(embed)
```

### Welcome banner
As for the welcome banner, it the same code as balance card, just remove text1 replace text2 with subtitle, aka setSubtitle, like so:
```bash
const dubstepmad_api = require('dubstepmad-api-wrapper')

let Image = await new dubstepmad_api.welcomebanner()
.setBackground(background)
.setAvatar(avatar)
.setTitle(username)
.setSubtitle(subtitle)
.setTextColor(textcolor) //in hex
.build()
```

You can get a full list of the possible API endpoints [Here](https://api.dubstepmad.com/api/endpoints) 