const express = require('express');
const usersRoutes = require('./users.route');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to My App !!'));

router.use('/v1/users', usersRoutes);

module.exports = router;