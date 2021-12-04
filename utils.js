const fs = require('fs');

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

module.exports = {
    getDirectoryItems: getDirectoryItems,
    isDirectory: isDirectory,
};
