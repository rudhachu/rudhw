const { rudhra,PREFIX,updateBan, getBanStatus } = require("../lib");
const config = require("../config");
rudhra({
    pattern: "bot ?(.*)",
    fromMe: true,
    desc: "bot on or off in specific group",
    type: "user",
},async (message, match) => {
    const status = await getBanStatus(message.jid);
    let link = `${config.BOT_INFO.split(";")[2]}`;
    let url = await message.ParseButtonMedia(link);
    
    let data = {
      jid: message.jid,
      button: [
        {
          type: "reply",
          params: {
            display_text: "ᴏɴ",
            id: `${PREFIX}bot on`,
          },
        },
        {
          type: "reply",
          params: {
            display_text: "ᴏꜰꜰ",
            id: `${PREFIX}bot off`,
          },
        },
      ],
      header: {
        title: `𝗥𝗨𝗗𝗛𝗥𝗔 𝗕𝗢𝗧`,
        subtitle: "",
        hasMediaAttachment: true,
      },
      footer: {
        text: "ᴄᴜʀʀᴇɴᴛ ꜱᴛᴀᴛᴜꜱ : " + status,
      },
      body: {
        text: "",
      },
    };

    if (link.endsWith(".mp4")) {
      data.header.videoMessage = url;
    } else {
      data.header.imageMessage = url;
    }
   
    if (!match || match.trim() === '') {
      await message.sendMessage(message.jid, data, {}, "interactive");
      return;
    }
    if (match.trim() === 'on') {
      await updateBan(message.jid, 'remove');
      return await message.send('_Bot activated in this chat_');
    } else if (match.trim() === 'off') {
      await updateBan(message.jid, 'add');
      return await message.send('_Bot deactivated in this chat_');
    }
  }
);
