const Report = require('../models/report');

async function create(req, res) {
    console.log(req.body)
    // try {
    //     const report = await Report.create(req.body);
    //     res.status(201).json(report);
    // } catch (err) {
    //     res.status(500).json(err)
    // }
}

// async function deleteOne(req, res) {
//     try {
//         const deletedReport = await Report.findByIdAndDelete(req.body._id);
//         res.status(200).json(deletedReport)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

module.exports = {
    create, 
    // deleteOne
}