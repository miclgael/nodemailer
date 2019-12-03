#!/usr/bin/node

const dotenv = require('dotenv');
const axios = require('axios');
const mailTransporter = require('./services/nodemailer.service');

dotenv.config();

async function mailer(messageData) {
  const info = await mailTransporter.sendMail(messageData);
  console.log('Message sent: %s', info.messageId);
}

const basicUser = process.env.AUTH_NAME || '';
const basicToken = process.env.AUTH_TOKEN || '';
const buffered = Buffer.from(`${basicUser}:${basicToken}`).toString('base64');

const options = {
  method: 'GET',
  headers: {
    Authorization: `Basic ${buffered}`,
  },
};

axios.get(process.env.API_ENDPOINT || "", options)
  .then((response) => {
    const jobStatus = (response.data.success === true) ? 'was successful' : 'failed';

    // Send an email notification with result (whether pass or fail)
    mailer({
      from: `"${process.env.SMTP_NICENAME}" <${process.env.SMTP_USER}>`, // sender address
      to: `${process.env.SMTP_USER}`, // list of receivers
      subject: `CRON job ${jobStatus}!`, // Subject line
      text: `The CRON job, "${process.env.JOB_NAME}", which ran on ${new Date()} ${jobStatus}! `, // plain text body
      html: `
        <p>The CRON job, <b>"${process.env.JOB_NAME}"</b>, which ran on ${new Date()} ${jobStatus}!</p>
      `,
    }).catch(console.error);
  })
  .catch((error) => {
    console.log(error);
  });
