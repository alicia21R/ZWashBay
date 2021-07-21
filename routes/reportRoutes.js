const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const moment = require('moment');
const Washer = require('../models/Washer')
const CarTracker = require('../models/CarTracker')



router.get('/washerDetails', async (req, res) => {
    try {
        // find all the data in the Washers collection
        let washerDetail = await Washer.find();
        res.render('washerDetails', { washers: washerDetail, title: 'Washer Profile' })
    } catch (err) {
        console.log(err)
        res.send('Failed to retrive washer details');
    }
})

router.get('/washerPay', async (req, res) => {
    try {
        // use moment to get selected date and default date
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // based on selected date , query to get the count of vehicles per washer,
        //  &  payout per washer.
        let washedVehicles = await CarTracker.aggregate(
            [ {$match: { doa: new Date(selectedDate) }},
            { $group: { _id: '$washer', count: { $sum: 1 }, totalPayout: { $sum: '$washerFee' } } },
            { $lookup: { from: 'washers', localField: '_id', foreignField: '_id', as: "details" } }
            ])
        // get the total payout for all the washers based on the selected date
        let totalPayoutPerDay = await CarTracker.aggregate([
                { $match: { doa: new Date(selectedDate) } },
                { $group: { _id: '$doa', totalPayoutPerDay: { $sum: '$washerFee' } } }
            ])
        // pass the all the relevant data as you render the payout report
        res.render("washerPay", { washers: washedVehicles, 
            title: "List of Car Washers", defaultDate: selectedDate ,
            sumPayout:totalPayoutPerDay[0]})
    }
    catch (err) {
        console.log(err)
        res.send('Failed to retrive payout details');
    }
})


module.exports = router;