const express                    = require("express");
const router                     = express.Router();
const urlController              = require("../controllers/urlController");
const { checkAuthentication }    = require("../config/jwt")

router.post('/shorten',    checkAuthentication,     urlController.shortenUrl);
router.get('/url/:shortUrl',    urlController.redirectUrl);

module.exports                  = router;