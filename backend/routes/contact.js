const express = require('express');
const router = express.Router(); // <-- this was missing
const { submitContact } = require('../controllers/contactController');


router.post('/', submitContact);

module.exports = router;
