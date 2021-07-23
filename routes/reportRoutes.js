const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const moment = require('moment');
const Washer = require('../models/Washer')
const CarTracker = require('../models/CarTracker')
const Expenses = require('../models/Expenses')



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

router.get('/washerExpenses', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day
        let expenseDetails = await Expenses.find({ do: selectedDate })

        // query for total expense on a day
        let totalExpense = await Expenses.aggregate([
            { $match: { do: new Date(selectedDate) } },
            { $group: { _id: '$do', totalExpense: { $sum: '$amount' } } }
        ])

        res.render("washerExpenses", {
            expenses: expenseDetails, total: totalExpense[0],
            title: "Expenses", defaultDate: selectedDate
        })
    } catch (err) {
        console.log(err)
        res.send('Failed to retrive Expense details');
    }
})
router.get('/carPayment', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day

        let collectionDetails = await CarTracker.find({ doa: selectedDate })

        // query for total expense on a day
        let totalCollection = await CarTracker.aggregate([
            { $match: { doa: new Date(selectedDate) } },
            { $group: { _id: '$doa', totalCollection: { $sum: '$packagePrice' } } }
        ])

        res.render("carPayment", {
            collections: collectionDetails, total: totalCollection[0],
            title: "Collections", defaultDate: selectedDate
        })

    } catch (err) {
        console.log(err)
        res.send('Failed to retrive collections details');
    }
})



module.exports = router;