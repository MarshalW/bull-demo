const delay = require("delay");
const config = require("config");
const delayTime = config.get("sandboxed").delay;

module.exports = async function(job) {
  console.log(`Receive from separate process, token: ${job.data.token}`);
  if (process.pid) {
    console.log(`This process is your pid ${process.pid}`);
  }
  if (delayTime > 0) {
    console.log(`Delay ${delayTime}ms ..`);
    await delay(delayTime);
    console.log("Continued.");
  }
  return Promise.resolve(job.data.token);
};
