var childProcess = require('child_process');

const runScript = (scriptPath, args) => {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    if(args) {
        process.send(args);
    }

    return new Promise(resolve => {
        process.on('message', (msg) => resolve(msg.result));
        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            return resolve(err);
        });
        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            var err = code === 0 ? null : new Error('exit code ' + code);
            return resolve(err);
        });
    })

}

module.exports = runScript;