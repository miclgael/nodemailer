import { config } from 'dotenv';

config();

const auth = {
  name: process.env.AUTH_NAME,
  token: process.env.AUTH_TOKEN,
}

const buffered = Buffer.from(`${auth.name}:${auth.token}`).toString('base64')

const options = {
  method: 'GET',
  headers: {
    Authorization: `Basic ${buffered}`,
  }
}

export default options