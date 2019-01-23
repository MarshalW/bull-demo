const Queue = require("bull");
const delay = require("delay");

async function run(params) {
  let queue = new Queue("my_queue");

  queue.process(async job => {
    console.log(`receive token ${job.data.token}`);

    if (params.delay) {
      console.log(`Delay ${params.delay}ms ..`);
      await delay(params.delay);
      console.log("Continued.");
    }
    return Promise.resolve(job.data.token);
  });

  queue.on("completed", (job, result) => {
    console.log(`Job completed with result ${result}`);
  });
}

module.exports = {
  run
};
