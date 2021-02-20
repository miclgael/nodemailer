#!/usr/bin/node

// dependencies
import fetch from "node-fetch"

// modules
import mailer from "./functions/mailer.js"
import args from "./functions/args.js"
import options from "./functions/options.js"

fetch(process.env.API_ENDPOINT, options)
  .then((res) => res.json())
  .then((json) => {
    // Send email notification with result
    mailer(args(json)).catch(console.error)
  })
  .catch((error) => {
    // Report errors with request
    console.log(error)
  })
