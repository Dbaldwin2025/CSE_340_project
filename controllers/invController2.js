

const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

async function newClassification (req, res) {
    let nav = await utilities.getNav() 
    
  const classificationSelect = await utilities.buildClassificationList()
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
        errrors: null,
        managementView,
        classificationSelect,
      })
    } else {
      req.flash("notice", "Sorry, the new classification failed.")
     
      res.status(501).render("./inventory/management", {
        title: "Managemant",
        nav,
        errrors: null,
        managementView,
        classificationSelect,
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
      
      const classificationSelect = await utilities.buildClassificationList()
      res.status(201).render("./inventory/management", {
        title: "Managemant",
        nav,
        errrors: null,
        managementView,
        classificationSelect,
      })
    } else {
      req.flash("notice", "Sorry, the new vehicle failed.")
      const managementView = await utilities.buildManagementPage()
      
      const classificationSelect = await utilities.buildClassificationList()
      res.status(501).render("./inventory/management", {
        title: "Managemant",
        nav,
        errrors: null,
        managementView,
        classificationSelect,
      })
    }
  }
   
  async function editInventoryView(req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryByInvId(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData[0].classification_id)
    const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
      res.render("./inventory/edit", {
      title: "Edit " + itemName,
      nav,
      
      classificationSelect: classificationSelect,
      errors: null,
      inv_id: itemData[0].inv_id,
      inv_make: itemData[0].inv_make,
      inv_model: itemData[0].inv_model,
      inv_year: itemData[0].inv_year,
      inv_description: itemData[0].inv_description,
      inv_image: itemData[0].inv_image,
      inv_thumbnail: itemData[0].inv_thumbnail,
      inv_price: itemData[0].inv_price,
      inv_miles: itemData[0].inv_miles,
      inv_color: itemData[0].inv_color,
      classification_id: itemData[0].classification_id
      
    })
  }


/* ***************************
 *  Update Inventory Data
 * ************************** */

async function updateInventory(req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
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

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")

 } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
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
    })
  }
}

  module.exports = {newClassification, newVehicle, updateInventory, editInventoryView};

  