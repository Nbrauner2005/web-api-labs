import express from 'express';
import User from './userModel';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/', async (req, res) => {
    await User(req.body).save();
    res.status(201).json({
        code: 201,
        msg: 'Successful created new user.',
    });
});

export default router;