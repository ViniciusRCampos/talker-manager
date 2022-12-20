const fs = require('fs').promises;
const crypto = require('crypto');

const path = './src/talker.json';

const getTalkers = async () => {
    try {
        const contentFile = await fs.readFile(path, 'utf-8');
        return JSON.parse(contentFile);
    } catch (error) {
        return null;
    }
};

const createToken = () => {
    return crypto.randomBytes(8).toString('hex');
};

module.exports = {
    getTalkers,
    createToken,
};