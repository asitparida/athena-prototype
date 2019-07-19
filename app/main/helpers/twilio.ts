// import { Subject } from "rxjs";
// import * as _ from 'lodash';

// class TwilioManager {
//     client = null;
//     messages = new Subject<[]>();
//     initialize() {
//         const accountSid = 'AC90fba0e5a6ed99cd255ff123b538f952';
//         const authToken = '5eef95c80c2e25f2b2b839c564aae09d';
//         const client = require('twilio')(accountSid, authToken);
//         this.client = client;
//     }
//     getMessages() {
//         if (this.client) {
//             this.client.messages.list({ limit: 20, to: '+14122148476',  })
//                 .then(messages => {
//                     messages.forEach(this.processMessage);
//                 }, (error) => console.log);
//         }
//     }
//     processMessage(message) {
//         console.log(message.sid, _.startsWith(message.sid, 'MM'));
//         if (message && message.sid) {
//             if (_.startsWith(message.sid, 'MM')) {
//                 console.log('hello + ', message.sid);
//                 this.client.messages(message.sid).media().list({ limit: 20 })
//                 .then(data => {
//                     console.log(data);
//                 }, console.log);
//             }
//         }
//     }
//  }

// export const Twilio = new TwilioManager();
