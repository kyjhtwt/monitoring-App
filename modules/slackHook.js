const Slack = require('slack-node');
require('dotenv').config();

webhookUri = process.env.WEBHOOKURL;
slack = new Slack();
slack.setWebhook(webhookUri);
class SlackHook {
  static async send(message) {
    slack.webhook({
      channel: process.env.CHANNEL_NAME,
      username: "Monitoring app",
      text: message
    }, function(err, response) {
    });
  }
}

module.exports = SlackHook