import status from "./status.js"

export default function (json) {
  // Give request feedback
  console.log("Request", status(json.success))

  return {
    from: `"${process.env.SMTP_NICENAME}" <${process.env.SMTP_USER}>`,
    to: `${process.env.SMTP_USER}`,
    subject: "CRON job " + status(json.success) + "!",
    text:
      'The CRON job, "' +
      process.env.JOB_NAME +
      `, which ran on ${(new Date(), status(json.success))}! `,
    html: `<p>The CRON job, <b>"${
      process.env.JOB_NAME
    }"</b>, which ran on ${new Date()} ${status(json.success)}!</p>`,
  }
}
