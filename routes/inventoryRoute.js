// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId)
router.get("/test/:testNum", invController.buildTest)
router.get("/", invController.buildManagementPage)
router.get("/add_classification", invController.addClassification)
router.get("/add_inventory", invController.addVehicle)
module.exports = router;