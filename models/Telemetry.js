const mongoose = require("mongoose")

const telemetrySchema = new mongoose.Schema({

    deviceId: {
        type:String,
        index: true
    },

    timestamp: {
        type:Date
    },

    metrics: {
        temperature: Number,
        humidity: Number,
        battery: Number
    }
})

telemetrySchema.index({deviceId:1, timestamp: -1})

telemetrySchema.index({timestamp: 1}, {expireAfterSeconds:60*60*24*90})

module.exports = mongoose.model("Telemetry", telemetrySchema)