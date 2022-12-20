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

const writeTalker = async (talker) => {
   await fs.writeFile(path, JSON.stringify(talker));
};

const createToken = () => crypto.randomBytes(8).toString('hex');

// const validateEmail = /^\S+[@]\w+[.]\S+$/gm;
// const validateDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const validateEmail = /^\S+[@]\w+[.]\S+$/gm;
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

const validateToken = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (token.length !== 16 || typeof (token) !== 'string') {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age <= 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    
    const { watchedAt } = talk;

    const validateDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!validateDate.test(watchedAt)) {
        return res.status(400).json({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (+rate > 5 || +rate < 1 || !(Number.isInteger(rate))) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
    }
    next();
};

module.exports = {
    getTalkers,
    writeTalker,
    createToken,
    validateLogin,
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
};