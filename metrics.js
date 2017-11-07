const client = require('prom-client');
const register = new client.Registry();
const express = require('express')
const router = express.Router()



router.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});


//enabling default metrics
client.collectDefaultMetrics({ register })


module.exports = router
