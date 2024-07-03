// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const baseController = require("../controllers/baseController")

// Routes
router.get("/login", utilities.handleErrors(accountController.buildLogin, accountController.accountLogin));

router.get("/accounts/:accountId",utilities.handleErrors(accountController.accountTest));

router.get("/edit",utilities.handleErrors(accountController.buildEditAccount));

router.get("/register", utilities.handleErrors(accountController.buildRegister, accountController.registerAccount));

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

router.get("/login", utilities.handleErrors(regValidate.checkLoginData, regValidate.checkRegData, regValidate.loginRules, regValidate.registationRules))

// Process the registration data - working
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  );

  // Process the login attempt -NOT working
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)
 // Process the login attempt -NOT working
 
  router.post(
    "/accounts/:accountId",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )
    

module.exports = router