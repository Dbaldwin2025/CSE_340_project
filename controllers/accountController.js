const utilities = require('../utilities/')
const accountModel = require('../models/account-model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

/* ****************************************
*  login view - working
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    const login = await utilities.buildLoginPage()
    res.render("account/login", {
      title: "Login",
      nav,
      login,
    })
  }

  /* ****************************************
 *  Process login - NOT working
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    const login = await utilities.buildLoginPage()
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    account_email,
    login,
   })
  return
  }
  try {
    
   if (await bcrypt.compare(account_password, accountData.account_password)) {
   delete accountData.account_password
   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
   if(process.env.NODE_ENV === 'development') {
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     } else {
       res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
     }
      
   return res.redirect("/account/")

  }
  } catch (error) {
   return new Error('Access Forbidden')
  }
 }


/* ****************************************
*  Deliver registration view - working
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  const register = await utilities.buildRegisterPage()
  res.render("account/register", {
    title: "Register",
    nav,
    register,
    errors: null,
  })
}

/* ****************************************
*  Process Registration - working
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body
// Hash the password before storing
let hashedPassword
try {
  // regular password and cost (salt is generated automatically)
  hashedPassword = await bcrypt.hashSync(account_password, 10)
} catch (error) {
  req.flash("notice", 'Sorry, there was an error processing the registration.')
  res.status(500).render("account/register", {
    title: "Registration",
    nav,
    errors: null,
  })
}
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    const login = await utilities.buildLoginPage()
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      login,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    const login = await utilities.buildLoginPage()
    res.status(501).render("account/login", {
      title: "Login",
      nav,
      login,
    })
  }
}

module.exports = { buildLogin, accountLogin, buildRegister, registerAccount};
 