const utilities = require("../utilities/")
const baseController = {}


/* ***************************
 *  Build home page - working
 * **************************/
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

module.exports = baseController