const { rudhra, mode, commands, PREFIX } = require("../lib");
const version = require("../package.json").version;
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
            const cmdName = command.pattern.toString().match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/)[2].trim();
            msg += `${no++}. ${cmdName}\n${command.desc}\n\n`;
        }
    }

    await message.reply(msg.trim());
});

rudhra({
    pattern: 'help$',
    fromMe: mode,
    dontAddCommandList: true
}, async (message, match) => {
const readMore = String.fromCharCode(8206).repeat(4001);
    if (match) {
        for (const cmd of commands) {
            if (cmd.pattern instanceof RegExp && cmd.pattern.test(`${PREFIX}${match}`)) {
                const cmdName = cmd.pattern.toString().split(/\W+/)[1];
                await message.reply(`\`\`\`rudhra: ${PREFIX}${cmdName.trim()}
Description: ${cmd.desc}\`\`\``);
            }
        }
    } else {
        // Full help menu
        const { prefix } = message;
        const [date, time] = new Date()
            .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            .split(",");

        let menu = `╔════════════════════•
║╔═════════════════◉
║║   *User* : ${message.pushName}
║║   *Bot Name* : ${config.BOT_NAME} 
║║   *Version* : ${version}
║║   *Mode* : ${config.MODE}
║║   *Prefix* : ${PREFIX}
║║   *Server* : ${hostname().split("-")[0]}
║║   *Date* : ${date}
║║   *Comments* : ${commands.length} 
║║
║║      █║▌║▌║║▌║ █
║║       ʀ   ᴜ   ᴅ   ʜ   ʀ   ᴀ
║╚═════════════════◉
╚════════════════════•\n ${readMore}`;

        const cmnd = [];
        const category = [];
        let cmd;

        commands.forEach((rudhra, num) => {
            if (rudhra.pattern instanceof RegExp) {
                cmd = rudhra.pattern.toString().split(/\W+/)[1];
            }

            if (!rudhra.dontAddCommandList && cmd !== undefined) {
                const type = rudhra.type ? rudhra.type.toLowerCase() : "misc";
                cmnd.push({ cmd, type });
                if (!category.includes(type)) category.push(type);
            }
        });

        cmnd.sort();
        category.sort();

        category.forEach((cmmd) => {
            menu += `╔═══❮ *${cmmd.toUpperCase()}* ❯═══◆
║╔═══════════════▸
║║\n`;
            const comad = cmnd.filter(({ type }) => type === cmmd);
            comad.forEach(({ cmd }) => {
                menu += `║║▸  ${cmd.trim()}\n`;
            });
            menu += `║║
║╚═══════════════▸
╚═════════════════◆\n`;
        });

        menu += `\n${config.BOT_NAME}`;

        await message.send(menu, {
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
            }
        });
    }
});
