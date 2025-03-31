const { Sequelize } = require("sequelize");
const fs = require("fs");
require('dotenv').config();

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env', override: true });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
const toBool = (x) => (x && x.toLowerCase() === 'true') || false;
global.webUrl = 'https://rudhra-web-server.onrender.com/'
global.rudhraWebUrl = 'https://rudhra-web-server.onrender.com/'
const DATABASE_URL = process.env.DATABASE_URL === undefined ? './database.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
module.exports = {
  BRANCH: "main",
  ADMIN_ACCESS: toBool(process.env.ADMIN_ACCESS) || false,
  ALLWAYS_ONLINE: toBool(process.env.ALLWAYS_ONLINE) || false,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  ANTILINK: toBool(process.env.ANTI_LINK) || true,
  AUDIO_DATA: process.env.AUDIO_DATA || "𝗥𝗨𝗗𝗛𝗥𝗔 𝗕𝗢𝗧;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ;https://raw.githubusercontent.com/rudhraan/media/main/image/rudhra2.jpg",
  BOT_INFO: process.env.BOT_INFO || "ʀᴜᴅʜʀᴀ ʙᴏᴛ;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ;https://raw.githubusercontent.com/rudhraan/media/main/image/rudhra2.jpg",
  BOT_NAME: process.env.BOT_NAME || "ʀᴜᴅʜʀᴀ ʙᴏᴛ",
  CAPTION: process.env.CAPTION || "ʀᴜᴅʜʀᴀ ʙᴏᴛ",
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  DISABLE_PM: toBool(process.env.DISABLE_PM) || false,
  ERROR_MSG: toBool(process.env.ERROR_MSG) || true,
  HANDLERS: (process.env.PREFIX || '^[.,!]').trim(),
  LINK_PREVIEW: process.env.LINK_PREVIEW || "𝗥𝗨𝗗𝗛𝗥𝗔 𝗕𝗢𝗧;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ;https://raw.githubusercontent.com/rudhraan/media/main/image/rudhra2.jpg",
  LOG_MSG: toBool(process.env.LOG_MSG) || true,
  MODE: (process.env.MODE || 'private').toLowerCase(),
  OWNER_NAME: process.env.OWNER_NAME || "ʀᴜᴅʜʀᴀɴ",
  READ_CMD: toBool(process.env.READ_CMD),
  READ_MSG: toBool(process.env.READ_MSG),
  SESSION_ID: process.env.SESSION_ID || "null",
  AUTHOR: process.env.AUTHOR || "Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ",
  STICKER_DATA: process.env.STICKER_DATA || "Ʀ ᴜ ᴅ ʜ ʀ λ;Ƥ ʀ ɪ ɴ ᴄ ᴇ  Ʀ ᴜ ᴅ ʜ",
  SUDO: process.env.SUDO || "919895809960",
  WARN_COUNT:process.env.WARN_COUNT || 4,
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU: toBool(process.env.HEROKU) || false,
  KOYEB_API_KEY: process.env.KOYEB_API_KEY || "koyeb_api_key",
  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || '',
  KOYEB: toBool(process.env.KOYEB) || false,
  TERMUX: toBool(process.env.TERMUX) || false,
  DATABASE_URL: DATABASE_URL,
  DATABASE:
       DATABASE_URL === './database.db' ? new Sequelize({dialect: 'sqlite', storage: DATABASE_URL, logging: false,}) : new Sequelize(DATABASE_URL, {dialect: 'postgres', ssl: true, protocol: 'postgres', dialectOptions: {native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false,}),
  DEBUG: DEBUG
};
