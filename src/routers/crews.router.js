const express = require("express");
const router = express.Router();
const crewsConstroller = require("../controllers/crews.controller");

router.get("/" ,crewsConstroller.getallcrwes); 
router.get("/:id" , crewsConstroller.getbyid);
router.post("/" , crewsConstroller.addcrew);
router.put("/:id", crewsConstroller.updatecrew);
router.delete("/:id" , crewsConstroller.deletecrew);


module.exports = router;