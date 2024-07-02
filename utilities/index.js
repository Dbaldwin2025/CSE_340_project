const invModel = require("../models/inventory-model")
const regModel = require('../models/account-model')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list - working
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML - working
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr >'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the detail view HTML - working
* ************************************ */
Util.buildDetailView = async function(data2){
  let detailView 
  if(data2.length > 0){
    detailView = '<div class="detail_page">'
    detailView += '<div class="detail_view">'
    detailView += '<img src="' + data2[0].inv_image
    +'" alt="Image of '+ data2[0].inv_make + ' ' + data2[0].inv_model 
    +' on CSE Motors"> </div>'
    detailView += '<div class="detail_data">'
    detailView +=  '<h2>'+ data2[0].inv_make + ' '+ data2[0].inv_model 
    + '</h2>' 
    detailView += '<span> <span class="bold1">Price: </span> $' 
    + new Intl.NumberFormat('en-US').format(data2[0].inv_price) + '</span>'
    detailView += '<p class="description">' + '<span class="bold1">Descripton: </span>' + data2[0].inv_description + '</p>'
    detailView += '<p class="color">' + '<span class="bold1">Color: </span>' + data2[0].inv_color + '</p>'
    detailView += '<p class="miles">' + '<span class="bold1">Miles: </span>' + new Intl.NumberFormat('en-US').format(data2[0].inv_miles) + '</p>'
    detailView += '</div>'
    detailView += '</div>'
} else { 
  detailView += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
}
  return detailView
}

/* **************************************
* Build the login view HTML - working
* ************************************ */
Util.buildLoginPage = async function() {
let login
    login = '<div class="login">'
    login += '<form id="loginForm" action="/account/login" method="post">'

    login += '<div>'
    login += '<label >Email Address:</label>'
    login += '</div>'

    login += '<div>'
    login += '<input type="email" title="email address" name="account_email" placeholder="Enter a valid email address" required>'
    login += '</div>'

    login += '<div>'
    login += '<label>Password:</label>'
    login += '</div>'

    login += '<div>'
    login += '<input type="password" title="password" name="account_password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$">'
    login += '</div>'

    login += '<div>'
    login += '<p>Passwords must be minimum of 12 characters and include 1 capital letter, 1 number and 1 special character.</p>'
    login += '</div>'

    login += '<div>'
    login += '<button type="Submit" value="Submit">Login</button>'  
    login += '</div>'

    login += '</form>'

    login += '<div>'
    login += '<p>No account? '
    login += "<a href='/account/register'>Sign-up</a> </p>"
    login += '</div>'

    login += '</div>'

  return login
}

/* **************************************
* Build the account view HTML - NOT working
* ************************************ */
Util.buildAccountPage = async function() {
  let account

      account = '<div class="account">'
      account += '<form id="account" action="/account" method="post">'
  
      account += '<div>'
      account += '<label >Account Management</label>'
      account += '</div>'
  
      account += '</div>'

    return account
  }

/* **************************************
* Build the registration view HTML - working
* ************************************ */  
Util.buildRegisterPage = async function() {
  let register

    register = '<div class="register">'
    register += '<form action="/account/register" method="post">'
    
    register += '<p>All fields are required</p>'

    register += '<div>'
    register += '<label >First name</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="text" name="account_firstname" id="accountFirstname" required value="">'
    register += '</div>'

    register += '<div>'
    register += '<label >Last name</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="text" title="last name" name="account_lastname" required value="">'
    register += '</div>'

    register += '<div>'
    register += '<label >Email Address:</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="email" title="email address" name="account_email" placeholder="Enter a valid email address"  required value="">'
    register += '</div>'


    register += '<div>'
    register += '<label>Password:</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="password" title="password" name="account_password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$">'
    register += '</div>'

    register += '<div>'
    register += '<p>Passwords must be minimum of 12 characters and include 1 capital letter, 1 number and 1 special character.</p>'
    register += '</div>'

    register += '<div>'
    register += '<button type="Submit value="Submit">Register</button>'  
    register += '</div>'

    register += '</form>'

    register += '</div>'

  return register
}
/* **************************************
* Build the management view HTML - working
* ************************************ */
Util.buildManagementPage = async function() {
  let management

    management = '<div class="management">'
    management += '<div>'
    management += '<a class="new_classification" href="../../inv/addNewClassification">New Classification</a>'
    management += '</div>'
    management += '<div>'
    management += '<a class="new_classification" href="../../inv/addNewInventory">New Vehicle</a>'
    management += '</div>'
    management += '</div>'

  return management
}

/* **************************************
* Build the add classification view HTML - working
* ************************************ */
Util.buildNewClassification = async function() {
  let addClassification

    addClassification = '<div class="new_classification">'
    addClassification += '<p>FIELD IS REQUIRED</p>'
    addClassification += '<form action="/inv/addNewClassification" method="post">'
    addClassification += '<label>Classification name</label>'
    addClassification += '<div>'
    addClassification += '<input type="text" name="classification_name" required pattern="^([A-Za-z]+){3,40}$">'
    addClassification += '</div>'
    addClassification += '<button class="Btn" type="submit" value="submit">Submit</button>'
    addClassification += '</form>'
    addClassification += '</div>'

  return addClassification
}
/* **************************************
* Build the classification list view HTML - working
* ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select title="classification" name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* **************************************
* Build the add vehicle view HTML - working
* ************************************ */
Util.buildNewVehicle = async function() {
  let addVehicle

    addVehicle = '<div class="new_vehicle">'
    addVehicle += '<p>FIELD IS REQUIRED</p>'
    addVehicle += '<form action="/inv/addNewInventory" method="post">'

    addVehicle += '<div>'
    addVehicle += '<label>Make</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="make" type="text" name="inv_make" placeholder="Min of 3 characters" required pattern="^([A-Za-z]+){3,40}$">'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Model</label>'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<input title="model" type="text" name="inv_model" placeholder="Min of 3 characters" required pattern="^([A-Za-z]+){3,40}$">'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Year</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="year" type="text" name="inv_year" placeholder="4-digit year" required>'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Description</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="description" name="inv_description" >'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Image Path</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="image path" type="text" name="inv_image" placeholder="/images/vehicles/image.jpg" required>'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Image Thumbnail</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="image thumbnail" type="text" name="inv_thumbnail" placeholder="/images/vehicles/image-tn.jpg" required>'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Price</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="price" type="text" name="inv_price" placeholder="decimal or integer" required>'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Miles</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="miles" type="text" name="inv_miles" placeholder="digits only" required>'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Color</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += '<input title="color" type="text" name="inv_color" required pattern="^([A-Za-z]+){3,40}$">'
    addVehicle += '</div>'

    addVehicle += '<div>'
    addVehicle += '<label>Classification</label>'
    addVehicle += '</div>'
    addVehicle += '<div>'
    addVehicle += await Util.buildClassificationList()
    addVehicle += '</div>'

    addVehicle += '<button class="Btn" type="submit" value="submit">Submit</button>'
    addVehicle += '</form>'
    addVehicle += '</div>'

  return addVehicle
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
   // let loggeinView = "Logout"
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }
 
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

