const client = require('prom-client');
const express = require('express')
const router = express.Router()



router.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
});

//enabling default metrics
client.collectDefaultMetrics()


const postCounter = new client.Counter({
    name: 'post_counter',
    help: 'Total number of times /post',
    labelNames: ['post_counter']
})

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})


module.exports = {
    router:router,
    postCounter:postCounter,
    httpRequestDurationMicroseconds:httpRequestDurationMicroseconds
}
