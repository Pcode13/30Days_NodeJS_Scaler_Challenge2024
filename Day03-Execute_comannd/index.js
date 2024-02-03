const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`Command encountered an error: ${stderr}`);
            return;
        }
        console.log(`Command output: ${stdout}`);
    });
}

// Example usage:
executeCommand('ls -l');