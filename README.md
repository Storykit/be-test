# Storykit BE Test
Create a backend application where you control a queue to send and receive messages. Our intent is not that this application should be production ready in any way. Skip steps that you feel are gold plating for the application.

Minimum feature set:
* Receive messages. `curl --request GET   --url http://localhost:9000/mail/<ReceipientName>`
* Send messages. ```curl --request POST   --url http://localhost:9000/mail   --header 'Content-Type: application/json'   --data '{
"message": "test",
"recipient": "<ReceipientName>",
"prio": false
}'```

Things we will look at and perhaps dicuss:
* Handle race conditions.
* Ensure that you're utilizing TypeScript.
* Git workflow.
* Unit testing.

The delivery of your solution to us should be in the form of a repository. Private or not, it's up to you. Just make sure to invite us to your repo if it's private. Your repository can but doesn't have to be a fork of this repository.

In this repository we have provided you with a boilerplate that you can use to start if you like. But feel free to change it and add the tools/framework etc to your liking.
## Installing
1. Clone repo
2. Install [https://docs.docker.com/install/](Docker) and NodeJS ([https://github.com/nvm-sh/nvm](nvm is useful for this))
2. Run `npm i`
3. Run `docker compose up --build` to start the NodeJS service and Redis

## Testing
Run `npm test` to run the test suite.

