// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const invController2 = require("../controllers/invController2")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));
router.get("/test/:testNum",utilities.handleErrors(invController.buildTest));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/addNewClassification", utilities.handleErrors(invController.buildClassification));
router.get("/addNewInventory", utilities.handleErrors(invController.addVehicle));
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView));
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


router.post(
    "/addNewClassification", 
    utilities.handleErrors(invController2.newClassification)
);

router.post(
        "/addNewInventory", 
        utilities.handleErrors(invController2.newVehicle)
);

module.exports = router