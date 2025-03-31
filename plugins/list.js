const { rudhra, mode, commands, PREFIX } = require("../lib");
const config = require("../config");
const { hostname } = require("os");

rudhra({
    pattern: 'list$',
    fromMe: mode,
    dontAddCommandList: true
}, async (message, match) => {
    let msg = '';
    let no = 1;
    for (const command of commands) {
        if (command.dontAddCommandList === false && command.pattern !== undefined) {
            msg += `${no++}. ${command.pattern.toString().match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/)[2].trim()}\n${command.desc}\n\n`;
        }
    }
    await message.reply(msg.trim());
});

rudhra({
    pattern: 'help$',
    fromMe: mode,
    dontAddCommandList: true
}, async (message, match) => {
    if (match) {
      for (let i of commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(`${PREFIX}` + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`rudhra: ${PREFIX}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `╔═══❮ *${config.BOT_INFO.split(";")[0]}* ❯═══•
║╔═══════════════◉
║║ *User* : ${message.pushName}
║║ *Prefix* : ${PREFIX}
║║ *Server* : ${hostname().split("-")[0]}
║║ *Date* : ${date}
║║ *Time* : ${time}
║║ *Comments* : ${commands.length} 
║║
║║    █║▌║▌║║▌║ █
║║     ʀ   ᴜ   ᴅ   ʜ   ʀ   ᴀ
║╚═══════════════◉
╚═════════════════•\n`;
      let cmnd = [];
      let cmd;
      let category = [];
      commands.map((rudhra, num) => {
        if (rudhra.pattern instanceof RegExp) {
          cmd = rudhra.pattern.toString().split(/\W+/)[1];
        }

        if (!rudhra.dontAddCommandList && cmd !== undefined) {
          let type = rudhra.type ? rudhra.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `╔╔══❮ *${cmmd.toUpperCase()}* ❯`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n║║  ${PREFIX} ${cmd.trim()} `;
        });
        menu += `\n`;
      });
        menu += `\n║║`;
      menu += `\n║╚═══════════⭓`;
      menu += `\n╚══════════════◉`;
      return await  message.send(menu, {
    contextInfo: {
externalAdReply: {
                    title: config.LINK_PREVIEW.split(";")[0],
                    body: config.LINK_PREVIEW.split(";")[1],
                    sourceUrl: "https://github.com/princerudh/rudhra-bot",
                    mediaUrl: "https://instagram.com",
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: false,
                    thumbnailUrl: config.LINK_PREVIEW.split(";")[2]
                }
    },
  });
    }
  }
);
