const fetch = require('node-fetch')
const os = require('os')


exports.sendLog = (levelNum, message, err) => {
    let level = levelNum === 1 ? 'Info' :
                levelNum === 2 ? 'Warning' :
                levelNum === 3 ? 'Error' : ''
    let log = { level, message, err, host: os.hostname() }
    fetch('http://172.18.0.3:8080/log', { method: 'POST', body: JSON.stringify(log), headers: {'Content-Type': 'application/json'} })
        .catch(err => {
            console.log(err)
        })
}