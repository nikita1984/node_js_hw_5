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
/**
 * Проверяет наличие по входящему пути файла
 * @param {string} filepath - путь к целевому файлу
 * @returns {boolean} - возвращает true если по переданному пути находиться файл
 */
const isFile = function (filepath) {
    return fs.lstatSync(filepath).isFile();
}

/**
 * Возвращает содержимое файла в виде массива
 * @param {string} filepath - путь к целевому файлу
 * @returns {Array} - содержимое файла в виде массива, элемент которого является строкой содержимого файла
 */
const getFileContents = (filepath) => {
    const chunks = [];
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filepath, 'utf-8');
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(chunks.toString('utf8').split(EOL)));
    });     
}

/**
 * Предоставляет содержимое файла или директории в виде HTML-строки
 * @param {string} filepath - путь к целевому файлу или директории
 * @returns {InnerHTML} - содержимое директории или файла в виде строки HTML-кода
 */
const getContent = async (filepath) => {
    if (isDirectory(filepath)) {
        const directoryItems = await getDirectoryItems(filepath);

        const templateArray = [];

        for (item of directoryItems){
            let templateString = `<p>
                <a href="/?path=${path.join(filepath, item)}">${item}</a>
            </p>`;

            templateArray.push(templateString);
        }
        
        return templateArray.join('<br>');
    }

    if (isFile(filepath)) {
        const content = await getFileContents(filepath);

        const templateArray = [];
        for (item of content) {
            let templateString = `<p>${item}</p>`;

            templateArray.push(templateString);
        }
        return templateArray.join('<br>');
    }
}

module.exports = {
    getContent: getContent,
};
