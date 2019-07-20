import * as _ from 'lodash';
import { SaveMedia } from "../main";
const TwilioAPI = require('twilio');
const extName = require('ext-name');

let client;
let twilioInterval;
const TwilioPingInterval = 10000;

class TwilioManager {
    client = null;
    initialize() {
        const accountSid = 'AC90fba0e5a6ed99cd255ff123b538f952';
        const authToken = '5eef95c80c2e25f2b2b839c564aae09d';
        client = TwilioAPI(accountSid, authToken);
        if (twilioInterval) {
            clearInterval(twilioInterval);
            twilioInterval = null;
        }
    }
    startFetch() {
        twilioInterval = setInterval(() => {
            this.getMessages();
        }, TwilioPingInterval);
    }
    cleanup() {
        clearInterval(twilioInterval);
        twilioInterval = null;
    }
    getMessages() {
        if (client) {
            client.messages.list({ limit: 20, to: '+14122148476', })
                .then(messages => {
                    console.log('TWILIO CALLED');
                    messages.forEach(this.processMessage);
                }, (error) => console.log);
        }
    }
    processMessage(message) {
        if (message && message.sid) {
            if (_.startsWith(message.sid, 'MM')) {
                // client.messages(message.sid).remove()
                // .then(m => console.log(m.sid));
                client.messages(message.sid).media
                    .list({ limit: 10 })
                    .then(media => media.forEach(m => {
                        client.messages(message.sid).media(m.sid).fetch().then(data => {
                            const uri = data.uri;
                            const extension = extName.mime(data.contentType)[0].ext;
                            const mediaUrl = 'https://api.twilio.com' + uri.replace('.json', '');
                            SaveMedia(mediaUrl, _.isEmpty(message.body) ? null : message.body, message.sid, message.dateUpdated);
                        }, (error) => console.log)
                    }), (error) => console.log);
            } else {
                // client.messages(message.sid).remove()
                // .then(m => console.log(m.sid));
                SaveMedia(null, _.isEmpty(message.body) ? null : message.body, message.sid, message.dateUpdated);
            }
        }
    }
}

export const Twilio = new TwilioManager();
