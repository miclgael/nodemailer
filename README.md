# nodemailer example

An example setup for a workflow I wanted.

- Use `node-fetch` to make a HTTP request to an endpoint (it just needs to report back with a JSON "success" message to work.
- Use `nodemailer` to send an email, with a message telling me the job succeeded or failed.
- Run the script weekly via `crontab`

## Installation

- `git clone https://github.com/miclgael/nodemailer-example.git`
- `mv .env.example .env` - rename ENV and enter your credentials in there
- `docker build -t nodemailer:0.1a ./` - Build the image

## Run the task

Once the image is built it can be run at any time with the following command

`docker run -it nodemailer:0.1a node index.js`

## Set up CRON

The task can be scheduled to run at certain intervals by setting a CRON to execute the run command.

Edit crontab file with `crontab -e`, or edit `/var/spool/cron/crontabs/root`

Add the following to the bottom of the file:
docker run --name $(docker ps -qf "name=nodemailer")
`* * * * * docker run -it nodemailer:0.1a node index.js >> /dev/null 2>&1`

[Adjust timings as necessary](https://crontab.guru).

I'm using "At 20:30 on Saturday" which is `30 20 * * 6`

Final CRON command as follows:

`30 20 * * 6 docker run -it nodemailer:0.1a node index.js >> /dev/null 2>&1`

## Set up SMTP

You'll need to set up SMTP, and you'll need some kind of mailing host.
