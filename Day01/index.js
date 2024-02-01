const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`Error reading file: ${err.code}: ${err.path} does not exist.`);
            } else {
                console.error(`Error reading file: ${err}`);
            }
            return;
        }
        console.log('File Content:');
        console.log(data);
    });
}
readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');