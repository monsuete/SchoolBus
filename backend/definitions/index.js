const NestHydrationJS = require('nesthydrationjs')()
const vehicle = require('./vehicle')
const empresa = require('./empresa')


module.exports = {
    hydration: definition => data => NestHydrationJS.nest(data, definition),
    vehicle,
    empresa
}
