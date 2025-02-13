const Schema = require('../model/schema');
const fs = require('fs');
const path = require('path');

module.exports.addAdmin = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    await Schema.create(req.body).then((data) => {
        res.status(200).json({ "message": "Admin added successfully" });
    }).catch((err) => {
        res.status(500).json({ "error": err.message });
    });
}

module.exports.viewAdmin = async (req, res) => {
    await Schema.find({}).then((data) => {
        res.status(200).json({ data: data });
    }).catch((err) => {
        res.status(500).json({ "error": err.message });
    });
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Schema.findById(req.query.id);
        if (admin) {
            const imagePath = path.resolve(admin.image);
            await Schema.findByIdAndDelete(req.query.id);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Failed to delete image file:", err);
                }
            });
            res.status(200).json({ "message": "Admin deleted successfully" });
        } else {
            res.status(404).json({ "error": "Admin not found" });
        }
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
}

module.exports.updateAdmin = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    await Schema.findByIdAndUpdate(req.query.id, req.body).then((data) => {
        res.status(200).json({ "message": "Admin updated successfully" });
    }).catch((err) => {
        res.status(500).json({ "error": err.message });
    });
}

