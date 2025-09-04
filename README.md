# DubStepMad API Wrapper

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
```js
const dubstepmad_api = require('dubstepmad-api-wrapper')
const Discord = require('discord.js')

const Image = await noodles_api.randommeme()
let  embed = new Discord.MessageEmbed()
	.attachFiles([{name:  "meme.png",  attachment:Image}])
	.setImage('attachment://meme.png')
message.channel.send(embed)
```

### Lisa-Stage command, 1 text input example
```js
const dubstepmad_api = require('dubstepmad-api-wrapper')
const Discord = require('discord.js')

let text = args.toString().replace(/,/g,  '  ')
let Image = await dubstepmad_api.lisastage(text)
  
const attachment = new Discord.MessageAttachment(Image);
message.channel.send(attachment);
```

### Drake command, more than one text input example
```js
const dubstepmad_api = require('dubstepmad-api-wrapper');

let text1 = args.toString().split('/')[0].replace(/,/g,  '  ')
let text2 = args.toString().split('/')[1].replace(/,/g,  '  ')

let Image  =  await dubstepmad_api.drake(text1,  text2)
const attachment = new Discord.MessageAttachment(Image);

message.channel.send(attachment);
```

### Trash command, image input example
```js
let Discord = require("discord.js");
const dubstepmad_api = require('dubstepmad-api-wrapper')

let user = message.mentions.users.first() || message.author
let result = user.displayAvatarURL()

let Image = await  dubstepmad_api.trash(result)

const attachment = new Discord.MessageAttachment(Image);
message.channel.send(attachment);
```

### Balance card command, for more than 2 inputs example
```js
let Discord = require("discord.js");
const dubstepmad_api = require('dubstepmad-api-wrapper')

let Image = await new dubstepmad_api.balancecard()
  .setBackground(background)
  .setAvatar(avatar)
  .setTitle(title)
  .setText1(text1)
  .setText2(text2)
  .setTextColor(HEX_TEXT_COLOUR)
  .build()

let embed= new Discord.MessageEmbed()
  embed.setTitle(`Here is your balance ${message.author.username}!!`)
  embed.attachFiles([{name: "balance.png", attachment:Image}])
  embed.setImage('attachment://balance.png');
  embed.setColor(process.env.EMBEDCOLOR)
  embed.setFooter('Using Noodles API')
  message.channel.send(embed)
```

### Welcome banner
For the welcome banner, use the same code as the balance card example, but remove `.setText1()` and replace `.setText2()` with `.setSubtitle()`, as shown below:

```js
const dubstepmad_api = require('dubstepmad-api-wrapper')

let Image = await new dubstepmad_api.welcomebanner()
  .setBackground(background)
  .setAvatar(avatar)
  .setTitle(username)
  .setSubtitle(subtitle)
  .setTextColor(HEX_TEXT_COLOUR)
  .build()
```

### Trading Card

```js
const dubstepmad_api = require('dubstepmad-api-wrapper')

let Image = await new dubstepmad_api.welcomebanner()
  .setBackground(background)
  .setAvatar(avatar)
  .setTitle(username)
  .setSubtitle(subtitle)
  .setTextColor(HEX_TEXT_COLOUR)
  .build()
```

You can get a full list of the possible API endpoints [Here](https://api.dubstepmad.com/api/documentation) 