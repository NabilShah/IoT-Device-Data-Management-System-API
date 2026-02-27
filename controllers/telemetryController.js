const Telemetry = require("../models/Telemetry")
const asyncHandler = require("../middleware/asyncHandler")

exports.insertTelemetry = asyncHandler(async(req, res) => {

    const data = await Telemetry.create({...req.body, timestamp: new Date(req.body.timestamp)})

    if(data.metrics.battery < 20){
        console.log("LOW BATTERY ALERT:", data.deviceId)
    }

    res.status(201).json(data)

})

exports.bulkInsert = asyncHandler(async(req, res) => {

    const result = await Telemetry.insertMany(req.body, {
        ordered:false
    })

    res.json({
        inserted: result.length
    })
})

exports.getTelemetry = asyncHandler(async(req, res) => {

    const {start,end} = req.query

    const data = await Telemetry.find({

        deviceId: req.params.deviceId,

        timestamp: {
            $gte:new Date(start),
            $lte:new Date(end)
        }
    }).sort({timestamp: -1})

    res.json(data)

})

exports.getLatest = asyncHandler(async(req, res) => {

    const data = await Telemetry.aggregate([

        {$sort: {timestamp: -1}},

        {
            $group: {
                _id:"$deviceId",
                latest: {$first: "$$ROOT"}
            }
        }
    ])

    res.json(data)
})

exports.getStats = asyncHandler(async(req, res) => {

    const {metric, start, end} = req.query

    const stats = await Telemetry.aggregate([

        {
            $match:{
                deviceId: req.params.deviceId,
                timestamp: {
                    $gte:new Date(start),
                    $lte:new Date(end)
                }
            }
        },

        {
            $group: {
                _id:null,
                avg:{$avg: `$metrics.${metric}`},
                min:{$min: `$metrics.${metric}`},
                max:{$max: `$metrics.${metric}`}
            }
        }
    ])

    res.json(stats)
})

exports.lowBattery = asyncHandler(async(req, res) => {

    const threshold = req.query.threshold || 20

    const data = await Telemetry.find({
        "metrics.battery" : { $lt : threshold }
    }).sort({timestamp: -1})

    res.json(data)

})

exports.offlineDevices = asyncHandler(async(req, res) => {
    
    const fifteenMinAgo = new Date(Date.now() - 15*60*1000)
    
    const data = await Telemetry.aggregate([
        {
            $group: {
                _id:"$deviceId",
                lastSeen:{$max:"$timestamp"}
            }
        },

        {
            $match:{
                lastSeen: { $lt : fifteenMinAgo}
            }
        }
    ])

    res.json(data)
})