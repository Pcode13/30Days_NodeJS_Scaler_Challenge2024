const fs = require('fs');

function writeToFile(filePath, content) {
        fs.writeFile(filePath, content ,(err)=>{
            if(err){
                console.error(`Error writing file: ${err} - ${filePath}`);
            }else{
                    console.log(`Writing file: ${filePath}`);
            }

        })
}
writeToFile('test-files/output1.txt','Data written to output1.txt')
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');