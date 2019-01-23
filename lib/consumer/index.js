const program = require("commander");
const simple = require("./simple");
const sandboxed = require("./sandboxed");

function isNumeric(num) {
  return !isNaN(num);
}

(async () => {
  program
    .version("0.1.0")
    .option(
      "-s --sandboxed [params]",
      "use sandboxed, default 1 worker process, eg. -s 3"
    )
    .option("-d --delay [params]", "delay ms, eg. -d 1000")
    .parse(process.argv);

  let processor = simple;
  let params = {
  };

  if (program.sandboxed) {
    processor = sandboxed;
    params.concurrency = 1;

    if (program.sandboxed !== true && isNumeric(program.sandboxed)) {
      params.concurrency = parseInt(program.sandboxed);
    }

    console.log(params.concurrency);
  }

  if (program.delay && isNumeric(program.delay)) {
    params.delay = parseInt(program.delay);
  }

  await processor.run(params);
})();

module.exports = async () => {};
