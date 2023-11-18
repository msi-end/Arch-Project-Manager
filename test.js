const { createHmac } = require('crypto')

console.log(createHmac('sha256', 'secret').update('msi').digest('hex'));