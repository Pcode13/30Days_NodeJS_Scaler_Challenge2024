const path=require('path')

function resolvePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log('Resolved Path:', absolutePath);
}

resolvePath('test_files/Files1.txt')
resolvePath('nonexistent-folder/file.txt');
