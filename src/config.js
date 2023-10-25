import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option('--mode <mode>', 'mode en que se levantara la app', 'dev')

program.parse()

const mode = program.opts().mode 

dotenv.config({
  path: mode == 'dev' ? '.env.development' : '.env.production'
})


export default {
  // MongoDB
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  // ADMIN:
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  // GitHub:
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  // JWT:
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_COOKIE: process.env.JWT_COOKIE
}