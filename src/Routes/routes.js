const express = require('express');
const { getTalkers, createToken, validateLogin } = require('../../utils');

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

module.exports = {
    router,
};