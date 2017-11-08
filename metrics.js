const client = require('prom-client');
const register = new client.Registry();
const express = require('express')
const router = express.Router()



router.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
});

//enabling default metrics
client.collectDefaultMetrics({ register })


const postCounter = new client.Counter({
    name: 'post_counter',
    help: 'Total number of times /post',
    labelNames: ['post_counter']
})



module.exports = {
    router:router,
    postCounter:postCounter
}
