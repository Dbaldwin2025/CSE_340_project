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
 *  Build management
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  const managementView = await utilities.buildManagementPage()
  const classificationSelect = await utilities.buildClassificationList()
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
        title: "Management",
    nav,
    errors: null,
    managementView,
    classificationSelect,
  })
}

invCont.addVehicle = async function (req, res, next) {
  const addInventory = await utilities.buildNewVehicle()
  let nav = await utilities.getNav()
  res.render("./inventory/addNewInventory", {
        title: "Add Vehicle",
    nav,
    addInventory,
  })
}

invCont.buildClassification = async function (req, res, next) {
  const addClassification = await utilities.buildNewClassification()
  let nav = await utilities.getNav()
  res.render("./inventory/addNewClassification", {
        title: "Add Classification",
    nav,
    addClassification,
    errors: null,
  })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * **************************/
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}
module.exports = invCont;
