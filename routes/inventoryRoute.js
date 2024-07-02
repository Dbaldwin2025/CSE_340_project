// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const invController2 = require("../controllers/invController2")
const invModel = require("../models/inventory-model")


// Routes
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

router.get("/test/:testNum",utilities.handleErrors(invController.buildTest));

router.get("/", utilities.handleErrors(invController.buildManagement));

router.get("/addNewClassification", utilities.handleErrors(invController.buildClassification));

router.get("/addNewInventory", utilities.handleErrors(invController.addVehicle));

router.get("/edit/:inv_id", utilities.handleErrors(invController2.editInventoryView, invController2.updateInventory));

router.get("/delete/:inv_id", utilities.handleErrors(invController2.deleteInventoryView, invController2.deleteInventory));

router.get("/edit", utilities.handleErrors(utilities.buildClassificationList));

router.get("/delete", utilities.handleErrors(utilities.buildClassificationList));

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

router.get("/edit/:inv_id", utilities.handleErrors(invModel.updateInventory));

router.get("/delete/:inv_id", utilities.handleErrors(invModel.deleteInventory));


router.post(
    "/addNewClassification", 
    utilities.handleErrors(invController2.newClassification)
);

router.post(
        "/addNewInventory", 
        utilities.handleErrors(invController2.newVehicle)
);

router.post(
    "/edit", 
    utilities.handleErrors(invController2.updateInventory)
);

router.post(
    "/delete", 
    utilities.handleErrors(invController2.deleteInventory)
);

module.exports = router