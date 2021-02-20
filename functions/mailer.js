import transporter from './transporter.js'

export default async function(messageData) {
  const info = await transporter.sendMail(messageData)
  console.log('Message sent: %s', info.messageId)
}