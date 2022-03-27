import twilio from "twilio";
import "dotenv/config";

const accountid = process.env.ACCOUNTID;
const authToken = process.env.AUTHTOKEN;

async function sendPhone(body) {
  try {
    const client = new twilio(accountid, authToken);
    await client.messages.create({
      body: { body },
      from: "+16072846446",
      to: "+917046604163",
    });
    // console.log("SMS Sent");
  } catch (error) {
    console.log(error);
  }
}

export default sendPhone;
