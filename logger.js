const fetch = require('node-fetch')
const os = require('os')


exports.sendLog = (levelNum, message, err) => {
    let level = levelNum === 1 ? 'Info' :
                levelNum === 2 ? 'Warning' :
                levelNum === 3 ? 'Error' : ''
    let log = { level, message, err: `${err.name} - ${err.message}`, hostId: os.hostname() }
    fetch('http://46.101.109.209:9700/hcn', { method: 'POST', body: JSON.stringify(log), headers: {'Content-Type': 'application/json'} })
        .catch(err => {
            console.log(err)
        })
}