# monitoring-App
## About
* This slack-app is made to supervise the server of poapper projects.
* This app can detect errors of the server that is specified in the url.json in data directory.
* When the error is detected by the app, it notices management team of poapper through sending slack message.
* The message sends every 2 hours if the error is not resolved.
## Usage
### Previous set up
* To use this app, you need to sign up at https://www.bugsnag.com/ first to generate bugsnag key.
* Also, the app needs webhook url of the slack-channel that you want to send message.
* fill .env file
### start
* npm run install
* Add urls that you want to supervise, through updating the json files in data directroy following the example codes.
* register monitor.js file in pm2
## 
![image](https://user-images.githubusercontent.com/80771569/132050845-5fa25de9-47b0-4595-8507-e9bf7a78e5d4.png)
## reference
https://www.bugsnag.com/


https://medteck15.medium.com/create-your-own-website-monitor-with-nodejs-and-bugsnag-the-ultimate-step-by-step-68829a77cc90
