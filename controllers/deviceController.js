const Device = require("../models/Device")
const asyncHandler = require("../middleware/asyncHandler")

exports.registerDevice = asyncHandler(async(req, res) => {

    const {deviceId, type, lat, long, status} = req.body

    if (!deviceId || !lat || !long ){
        const err = new Error("deviceId, lat, and long required")
        err.statusCode=400
        throw err
    }

    const device = await Device.create({
        deviceId,
        type,
        location: {
            type:"Point",
            coordinates: [long, lat]
        },
        status
    })

    res.status(201).json(device)
})

exports.updateStatus = asyncHandler(async(req, res) => {

    const device = await Device.findOneAndUpdate(
        {deviceId: req.params.deviceId},
        {status: req.body.status},
        {new:true}
    )

    if (!device){
        const err = new Error("Device not found")
        err.statusCode=404
        throw err
    }

    res.json(device)

})

exports.getDevice = asyncHandler(async(req, res) => {

    const device = await Device.findOne({deviceId:req.params.deviceId})

    if (!device) {
        const err = new Error("Device not found")
        err.statusCode=404
        throw err
    }

    res.json(device)
})

exports.listDevices = asyncHandler(async(req, res) => {

    const {page=1, limit=10, type, status} = req.query

    const filter = {}

    if (type) filter.type=type
    if (status) filter.status=status

    const devices = await Device.find(filter).skip((page-1)*limit).limit(Number(limit))

    res.json(devices)

})

exports.nearbyDevices = asyncHandler(async(req, res) => {
    const {lat, long, radius} = req.query

    const devices = await Device.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                },
                $maxDistance:Number(radius)
            }
        }
    })

    res.json(devices)
})