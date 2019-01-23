const Queue = require("bull");

async function run(params) {
  console.log(`Concurrency: ${params.concurrency}`);

  let queue = new Queue("my_queue");
  let { concurrency } = params;
  queue.process(concurrency, __dirname + "/worker.js");
}

module.exports = {
  run
};
