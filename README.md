# nodemailer example

> 🗄️ This project has been archived and is now read-only. Dependabot reports security issues ihe dependencies that I don't have time to fix. Please keep this in mind if you use this code. 

An example setup for a workflow I wanted.

- Use `node-fetch` to make a HTTP request to an endpoint (it just needs to report back with a JSON "success" message to work.
- Use `nodemailer` to send an email, with a message telling me the job succeeded or failed.
- Run the script weekly via `crontab`

## Installation

- `git clone https://github.com/miclgael/nodemailer-example.git`
- `mv .env.example .env` - rename ENV and enter your credentials in there
- `docker build -t nodemailer:latest ./` - Build the image

## Run the task

Once the image is built it can be run at any time with the following command

`docker run -it nodemailer:latest node index.js`

## Set up CRON

The task can be scheduled to run at certain intervals by setting a CRON to execute the run command.

Edit crontab file with `crontab -e` (as root)

Add the following to the bottom of the file:

`* * * * * docker run nodemailer:latest node index.js >> /dev/null 2>&1`

[Adjust timings as necessary](https://crontab.guru). e.g. I'm using "At 21:30 on Sunday" which is `30 21 * * 6`

Final CRON command as follows:

`30 21 * * 0 docker run nodemailer:latest node index.js >> /dev/null 2>&1`

## Set up SMTP

You'll need to set up SMTP, and you'll need some kind of mailing host.

## Make it your own

Next, you could implement system notifications, instead of email notifications! Check out [This article](https://davidwalsh.name/system-notifications-node) by David Walsh.
