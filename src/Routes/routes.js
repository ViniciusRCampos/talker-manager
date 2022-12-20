const express = require('express');
const { getTalkers, createToken, validateLogin, validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate, writeTalker } = require('../../utils');

const router = express.Router();

router.get('/talker', async (_req, res) => {
    const talkers = await getTalkers();
    // console.log(talkers);
    res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerId = talkers.find((talker) => talker.id === +id);
    if (talkerId) {
       return res.status(200).json(talkerId);
    }
    return res.status(404).json(
        { message: 'Pessoa palestrante não encontrada' },
    );
});

router.post('/login', validateLogin, async (_req, res) => {
    const token = { token: createToken() };
    // console.log(createToken());
    res.status(200).json(token);
});

router.post('/talker', 
validateToken,
validateName,
validateAge,
validateTalk,
validateRate, async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const id = talkers.length + 1;
    const newTalker = {
        id,
        name,
        age,
        talk,
    };
    talkers.push(newTalker);
    await writeTalker(talkers);
    res.status(201).json(newTalker);
});

router.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateRate, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const idTalker = talkers.findIndex((talker) => talker.id === +id);
    talkers[idTalker] = {
        ...talkers[idTalker], name, age, talk,
    };
    await writeTalker(talkers);
    res.status(200).json(talkers[idTalker]);
});

module.exports = {
    router,
};