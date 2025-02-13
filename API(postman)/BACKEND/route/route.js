const express = require('express');
const route = express.Router();
const ctl = require('../controller/ctl');
const module = require('../middleware/multer');

route.post('/addAdmin', module, ctl.addAdmin);
route.get('/viewAdmin', ctl.viewAdmin);
route.delete('/deleteAdmin', module, ctl.deleteAdmin);
route.put('/updateAdmin', module, ctl.updateAdmin);

module.exports = route;