# nodemailer example

An example setup for a workflow I wanted.

- Use `node-fetch` to make a HTTP request to an endpoint (it just needs to report back with a JSON "success" message to work.
- Use `nodemailer` to send an email, with a message telling me the job succeeded or failed.
- Run the script weekly via `crontab`

## Installation

- `git clone https://github.com/miclgael/nodemailer-example.git`
- `mv .env.example .env` - rename ENV and enter your credentials in there
- `docker build -t nodemailer:0.1a ./`

## Set up CRON

Edit crontab file with `crontab -e` (Calculate your schedule with https://crontab.guru)

Add the following to the bottom of the file:

`* * * * * docker exec -t $(docker ps -qf "name=nodemailer") /usr/bin/node index.js >> /dev/null 2>&1`

Adjust timings as necessary.

## Set up SMTP

You'll need to set up SMTP, and you'll need some kind of mailing host.
