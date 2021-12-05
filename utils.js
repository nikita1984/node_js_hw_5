const fs = require('fs')

const path = require('path')

const {EOL} = require('os')

/**
 * Метод, для получения содержимого из целевой аудитории 
 * @param {string} directory - путь к целевой директории
 * @returns {Array} - возвращает файлы из целевой аудитории в виде списка-массива
 */
 const getDirectoryItems = async (directory) => {
    const itemsInDirectory = await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            resolve(data);
        });
    });

    return itemsInDirectory;
}

/**
 * Проверяет наличие по входящему пути директории
 * @param {string} filepath - путь к целевой директории
 * @returns {boolean} - возвращает true если по переданному пути находиться директория
 */
 const isDirectory = function (filepath) {
    return fs.lstatSync(filepath).isDirectory();
}

const isFile = function (filepath) {
    return fs.lstatSync(filepath).isFile();
}

const getFileContents = (filepath) => {
    const chunks = [];
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filepath, 'utf-8');
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(chunks.toString('utf8').split(EOL)));
    });     
}


const getContent = async (filepath) => {
    if (isDirectory(filepath)) {
        const directoryItems = await getDirectoryItems(filepath);

        const directoryContentArray = [];

        for (item of directoryItems){
            let templateString = `<p>
                <a href="/content?path=${path.join(filepath, item)}">${item}</a>
            </p>`;

            directoryContentArray.push(templateString);
        }
        
        const directoryContentHTML = directoryContentArray.join('<br>');

        return directoryContentHTML;
    }

    if (isFile(filepath)) {
        const content = await getFileContents(filepath);

        const fileContentsTemplateArray = [];
        for (item of content) {
            let templateString = `<p>${item}</p>`;

            fileContentsTemplateArray.push(templateString);
        }
        const HTMLContent = fileContentsTemplateArray.join('<br>');

        return HTMLContent;
    }
}


module.exports = {
    getDirectoryItems: getDirectoryItems,
    isDirectory: isDirectory,
    getContent: getContent,
};
