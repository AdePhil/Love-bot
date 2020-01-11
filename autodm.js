require("dotenv").config();
const T = require("./twit");
const generateMessage = require("./message");
// const cron = require("node-cron");

async function AutoDm() {
  const text = await generateMessage();
  const recipient_id = "369098139";
  sendMessage({ text, recipient_id });
}
function sendMessage({ recipient_id, text }) {
  T.post("direct_messages/events/new", {
    event: {
      type: "message_create",
      message_create: {
        target: {
          recipient_id
        },
        message_data: {
          text
        }
      }
    }
  })
    .then(result => {
      console.log(`Message sent successfully To recipient 💪💪`);
    })
    .catch(err => {
      console.error("error", err);
    });
}
console.log("Testing...");
// cron.schedule("20 7 * * *", () => {
//   console.log("running  task every 7 am");
//   AutoDm();
// });
AutoDm();
