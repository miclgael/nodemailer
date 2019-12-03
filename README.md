# nodemailer example

An example setup for a workflow I wanted.

- Use `axios` to make a HTTP request to an endpoint (it just needs to report back with a JSON "success" message to work.
- Use `nodemailer` to send an email, with a message telling me the job succeeded or failed.
- Run the script weekly via `crontab` on my Raspberry Pi 3B+, which logs the most recent result to `reports/cron.log`

## Installation 

- `git clone ...` 
- `cd update-github-repos && npm install`
- `mv .env.example .env` - rename ENV and enter your credentials in there 

## Set up CRON

I'm using a Raspberry Pi 3B+, running latest Raspian OS (headless). 

Through a bunch of trial and error, this is what worked for me.

Edit crontab file with `crontab -e` (Calculate your schedule with https://crontab.guru) 

Add the following to the bottom of the file:

`0 0 * * 0 cd /<DIRECTORY_YOU_CLONED_INTO>/ && /usr/bin/node index.js > /<DIRECTORY_YOU_CLONED_INTO>/reports/cron.log`

To run node JS commands in a CRON job, I found it easiest to first change directories before running the node task as a relative path.
note that "node" command needs to be set to the absolute path of node's installation directory. eg (in my case) `/usr/bin/node`

## Set up SMTP

You'll need to set up SMTP on the Pi, and you'll need some kind of mailing host for it to work. I think a lot of folks use Gmail? I don't!

## Other Notes

Will also work as a Heroku job (with additional setup steps), but since that eats into additonal paid usage, I thought I'd try this instead. 

You also don't need a Pi to run this. As long as you've got Node JS installed. But, its harder to keep a full desktop or laptop running at all times... so... yeahhh...

Um, there's probably a billion easier ways to do this, but I ripped this straight out of my existing Express JS app, to see if i could execute that same code without Express, and without Heroku / cloud services.
