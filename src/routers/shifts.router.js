const express = require("express");
const router = express.Router();
const shiftsController = require("../controllers/shifts.controller");

router.get("/" , shiftsController.getallShifts);
router.get("/:id" , shiftsController.getshiftByID);
router.post("/", shiftsController.addShifts);
router.put("/:id", shiftsController.updateshift);
router.delete("/:id" , shiftsController.deleteshift)
module.exports = router;