var express = require('express');
var router = express.Router();

const { getQuotation,uploadQuotation } = require('../controllers/quotationController');

const upload = require('../middleware/upload');//multer configuration (Multer is for handling file uploads)


//Endpoints
router.post('/upload', upload.single('file'), uploadQuotation);

module.exports = router;