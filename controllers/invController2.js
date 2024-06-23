const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

async function newClassification (req, res) {
    let nav = await utilities.getNav() 
    const managementView = await utilities.buildManagementPage()
    const { classification_name } = req.body
  
    const regResult = await invModel.newClassification (
      classification_name
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you added a new classification ${classification_name}.`
      )
      
      res.status(201).render("./inventory/management", {
        title: "Management",
        nav,
        managementView,
      })
    } else {
      req.flash("notice", "Sorry, the new classification failed.")
     
      res.status(501).render("./inventory/management", {
        title: "Managemant",
        nav,
        managementView,
      })
    }
  }
  async function newVehicle(req, res) {
    let nav = await utilities.getNav()
    const managementView = await utilities.buildManagementPage()
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  
    const regResult = await invModel.newVehicle(
      inv_make,
      inv_model,
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color,
      classification_id
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you added ${inv_make} - ${inv_model}.`
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
  
  module.exports = {newClassification, newVehicle};