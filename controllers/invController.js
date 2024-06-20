const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data2 = await invModel.getInventoryByInvId(inv_id)
  const detailView = await utilities.buildDetailView(data2)
  let nav = await utilities.getNav()
  const vehicleMake = data2[0].inv_make
  const vehicleModel = data2[0].inv_model
  res.render("./inventory/details", {
    title: vehicleMake + "  " + vehicleModel,
    nav,
    detailView,
  })
}

/* ***************************
 *  Build detail view 2
 * ************************** */
invCont.buildTest = async function (req, res, next) {
  var test_num = req.params.testNum
  test_num = 1
  const detailView2 = "Hello test page"
  let nav = await utilities.getNav()
  res.render("./errors/test", {
//    title: "test",
    nav,
    detailView2,
  })
}

/* ***************************
 *  Build detail view 2
 * ************************** */
invCont.buildManagementPage = async function (req, res, next) {
  var management_num = req.params.managementNum
  management_num = 1
  const managementView = await utilities.buildManagementPage()
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
        title: "Management",
    nav,
    managementView,
  })
}




module.exports = invCont