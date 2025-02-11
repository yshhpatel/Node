const Schema = require('../model/schema');

module.exports.addAdmin = async (req, res) => {
    await Schema.create(req.body).then((data) => {
        res.status(200).json({ "message": "Admin added successfully"})
    })

}

module.exports.viewAdmin = async (req, res) => {
    await Schema.find({}).then((data) => {
        res.status(200).json({ data: data })
    })
}