const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const task = require('../../models/task')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route  Post api/tasks
// @desc   create a post
// @access Private
router.post('/', [ auth, [
    check('text', 'Text is required' )
    .not()
    .isEmpty()
    ]
],
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
    const user = await User.findById(req.user.id).select('-password');

    const newTask = {
        text: req.body.text,
        username: user.username,
        avatar: User.avatar,
        user: req.user.id
    } 
    const task = await newTask.save();

    res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;