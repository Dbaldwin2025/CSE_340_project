// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId)
router.get("/test/:testNum", invController.buildTest)
router.get("/", invController.buildManagement)
router.get("/add_classification", invController.buildClassification)
router.get("/add_inventory", invController.addVehicle)

router.get("/add_classification", utilities.handleErrors(invController.buildClassification))
router.post(
    "/add_classification", 
    utilities.handleErrors(invController.newClassification))
router.post(
        "/add_inventory", 
        utilities.handleErrors(invController.newVehicle))
        
module.exports = router