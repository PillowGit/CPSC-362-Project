# Documentation

## Package Requirements

This project was built using:

* `node v21.7.2`
* `npm v10.5.0`

While this may work on newer/older versions, it is not guaranteed. If it is your first time attempting to run this code locally, make sure you run `npm install` from the root directory to create the required node packages.

## Running & Live Testing

Use the following command to local host your code to the first open port:

`npm run dev -- --open`

Note that if you have not ran `npm install` locally on this repo before, then this may not work.

Feel free to also run the file `local_host.sh`

Since this is a SvelteKit project, then live testing is the norm. Any saved changes in your code repo will automatically and instantly be reflected in the browser tab opened via local host.

## Database Setup

This site utilizes Firebase in order to implement data persistence. If you'd like to run this locally with your own Firebase instance, you'll need to create and instantiate a `.env` file in the root directory. The `.env` file should contain these variables at the very least in order to function: 
```env
firebase_apiKey=""
firebase_authDomain=""
firebase_projectId=""
firebase_storageBucket=""
firebase_messagingSenderId=""
firebase_appId=""
```
Upon creating a Firebase project and activating Firestore Database, create an npm SDK and configure your Firestore Database ruleset to enable edit and access permissions. 

Finally, open Firestore Database and manually create a collection labeled `userdata` with documents `auths`, `lists`, and `users`. Your database should look like this:
```
userdata
├───── auths
├───── lists
└───── users
```

## Deploying

Deploying a website at the end of the day always comes down to preference. While it's always best to do your own research on your own methods, I've created this section because I highly recommend hosting this (and any) website on Vercel. Vercel is completely free with generous rate limits, and has fully integrated automatic deployments with SvelteKit. It also re-deploys your website with the latest changes on every push to Git.

Since this is a SvelteKit application, there will be a large amount of website hosting providers that support automatic SvelteKit configuration and hosting since it is a fairly popular web framework.