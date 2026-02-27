const mongoose = require("mongoose")

const deviceSchema = new mongoose.Schema({

    deviceId:{
        type:String,
        required:true,
        unique:true,
        index:true
    },

    type:String,

    location: {
        type: {
            type:String,
            default:"Point"
        },
        coordinates: [Number]
    },

    status: {
        type:String,
        enum: ["active", "inactive"],
        default: "active"
    },

    createdAt: {
        type:Date,
        default:Date.now
    }
})

deviceSchema.index({location:"2dsphere"})

module.exports = mongoose.model("Device", deviceSchema)