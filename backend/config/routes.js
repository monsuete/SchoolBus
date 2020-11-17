
const multer = require('multer')
const uploadConfig = require('../config/upload')

const upload = multer(uploadConfig)

module.exports = app => {

    app.route('/empresa', upload.array('images'))
        .post(app.api.empresa.save)
        .get(app.api.empresa.get)

    app.route('/empresa/:id')
        .put(app.api.empresa.save)
        .get(app.api.empresa.getById)
        .delete(app.api.empresa.remove)

    app.route('/empresa/:id/vehicle')
        .get(app.api.empresa.getByIdVehicles)

    // app.route('/images')
    //     .post(app.api.images.save)
    //     .get(app.api.images.get)

    // app.route('/images/:id')
    //     .put(app.api.images.save)
    //     .get(app.api.images.getById)

    app.route('/motorista')
        .post(app.api.motorista.save)
        .get(app.api.motorista.get)

    app.route('/motorista/:id')
        .put(app.api.motorista.save)
        .get(app.api.motorista.getById)
        .delete(app.api.motorista.remove)


    app.route('/cidade')
        .post(app.api.cidade.save)
        .get(app.api.cidade.get)

    app.route('/cidade/:id')
        .put(app.api.cidade.save)
        .get(app.api.cidade.getById)
        .delete(app.api.cidade.remove)

    app.route('/vehicle')
        .post(app.api.vehicle.save)
        .get(app.api.vehicle.get)


    app.route('/vehicle/:id')
        .put(app.api.vehicle.save)
        .get(app.api.vehicle.getById)
        .delete(app.api.vehicle.remove)

    app.route('/cidade/:id/empresa')
        .get(app.api.empresa.getByCidade)

}