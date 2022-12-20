const fs = require('fs').promises;

const path = './src/talker.json';

const getTalkers = async () => {
    try {
        const contentFile = await fs.readFile(path, 'utf-8');
        return JSON.parse(contentFile);
    } catch (error) {
        return null;
    }
};

module.exports = {
    getTalkers,
};