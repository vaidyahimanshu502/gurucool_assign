const express                = require("express");
const router                 = express.Router();
const viewController         = require("../controllers/viewsController");

router.get('/',             viewController.homePage);
router.get('/login',        viewController.loginPage);
router.get('/url-short',    viewController.urlPage);

module.exports               = router;