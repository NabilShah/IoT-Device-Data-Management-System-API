const express = require("express")
const router = express.Router()

const controller = require("../controllers/telemetryController")

router.post("/", controller.insertTelemetry)

router.post("/bulk", controller.bulkInsert)

router.get("/latest", controller.getLatest)

router.get("/alerts/low-battery", controller.lowBattery)

router.get("/alerts/offline", controller.offlineDevices)

router.get("/:deviceId", controller.getTelemetry)

router.get("/:deviceId/stats", controller.getStats)

module.exports = router