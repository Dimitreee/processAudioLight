import app from "./app";

const DEFAULT_PORT = 8080;
const DEFAULT_HOSTNAME = '0.0.0.0';
const port = process.env.PORT || DEFAULT_PORT;
const host = process.env.HOSTNAME || DEFAULT_HOSTNAME;

const server = app.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}/`);
});

const handleExit = (options) => (err) => {
  if (options.cleanup) {
    const actions = [server.close]; // TODO: add actions to close redis and db;

    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) {
            process.exit();
          }
        })
      } catch (e) {
        if (i === actions.length -1) {
          process.exit();
        }
      }
    });
  }

  if (err) {
    console.log(err, "error is hapend") // TODO: work with errors report
  }

  if (options.exit) {
    process.exit();
  }
};

process.on('exit', handleExit({ cleanup: true }));
process.on('uncaughtException', handleExit({ exit: true }));
