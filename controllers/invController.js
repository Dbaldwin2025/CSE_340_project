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
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
        title: "Management",
    nav,
    managementView,
  })
}

invCont.addVehicle = async function (req, res, next) {
  var management_num = req.params.managementNum
  management_num = 1
  const addInventory = await utilities.buildNewVehicle()
  let nav = await utilities.getNav()
  res.render("./inventory/add_inventory", {
        title: "Add Vehicle",
    nav,
    addInventory,
  })
}

invCont.buildClassification = async function (req, res, next) {
  var management_num = req.params.managementNum
  management_num = 1
  const addClassification = await utilities.buildNewClassification()
  let nav = await utilities.getNav()
  res.render("./inventory/add_classification", {
        title: "Add Classification",
    nav,
    addClassification,
    errors: null,
  })
}

async function newClassification(req, res) {
  let nav = await utilities.getNav() 
  const { classification_name } = req.body

  const regResult = await invModel.newClassification (
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added a new classification ${classification_name}.`
    )
    const managementView = await utilities.buildManagementPage()
    res.status(201).render("./inventory/management", {
      title: "Management",
      nav,
      managementView,
    })
  } else {
    req.flash("notice", "Sorry, the new classification failed.")
    const managementView = await utilities.buildManagementPage()
    res.status(501).render("./inventory/management", {
      title: "Managemant",
      nav,
      managementView,
    })
  }
}

async function newVehicle(req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const regResult = await invModel.newVehicle(
    inv_make,
    inv_model,
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added ${inv_make} - ${invModel}.`
    )
    const managementView = await utilities.buildManagementPage()
    res.status(201).render("./inventory/management", {
      title: "Managemant",
      nav,
      managementView,
    })
  } else {
    req.flash("notice", "Sorry, the new vehicle failed.")
    const managementView = await utilities.buildManagementPage()
    res.status(501).render("./inventory/management", {
      title: "Managemant",
      nav,
      managementView,
    })
  }
}


module.exports = invCont, {newClassification, newVehicle}
