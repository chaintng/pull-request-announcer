# Pull Request Announcer

## Overview
A web application that has `/webhook` endpoint for github pull request webhook.
Whenever somebody label a PR, we'll got the webhook request.
And if it has been set the slack action, it will announce to the slack channel intervally.

## How to run
1. Config in `src/config.json` file
2. run `npm start`
3. Set github webhook point to this application `/webhook` endpoint.
