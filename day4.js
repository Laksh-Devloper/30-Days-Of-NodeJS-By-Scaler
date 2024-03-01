const path = require('path');

function resolvePath(relativePath) {
    const currentDirectory = process.cwd();

    const absolutePath = path.resolve(currentDirectory, relativePath);

    console.log('Resolved Path:', absolutePath);
}


resolvePath('file.txt');
resolvePath('nonexistent-folder/file.txt');
