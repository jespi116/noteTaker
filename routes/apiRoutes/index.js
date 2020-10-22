const router = require('express').Router();
const notes = require('../apiRoutes/notes');

router.use(notes);

module.exports = router;