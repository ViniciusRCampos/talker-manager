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

const createToken = () => crypto.randomBytes(8).toString('hex');

const validateEmail = /^\S+[@]\w+[.]\S+$/gm;

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) { 
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
    }
    if (!validateEmail.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    }

    next();
};

module.exports = {
    getTalkers,
    createToken,
    validateLogin,
};