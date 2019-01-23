const Queue = require("bull");

let queue = new Queue("my_queue");

// 每隔1秒，发送一个Job，包括一个随机数token
setInterval(() => {
  let token = Math.floor(Math.random() * 10000) + 1;
  queue.add({ token });
  console.log(`send ${token}`);
}, 1000 * 1);

module.exports = async () => {};
