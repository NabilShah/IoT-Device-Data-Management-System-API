const express = require("express")
const router = express.Router()

const controller = require("../controllers/deviceController")

router.post("/", controller.registerDevice)

router.patch("/:deviceId/status", controller.updateStatus)

router.get("/:deviceId", controller.getDevice)

router.get("/", controller.listDevices)

router.get("/nearby/search", controller.nearbyDevices)

module.exports = router