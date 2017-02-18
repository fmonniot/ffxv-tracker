const fs = require('fs')
const config = require('./config.json')
const merge = require('lodash/merge')

const newAppVersion = config.versions.app + 1

const newConfig = merge(config, {
    versions: {
        app: newAppVersion
    }
})

fs.writeFileSync('./config.json', JSON.stringify(newConfig))
fs.writeFileSync('./VERSION', newAppVersion)