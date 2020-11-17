const { hydration, vehicle } = require('../definitions')

module.exports = app => {
    const { existsOrError } = app.api.validation


    const save = (req, res) => {
        const images = { ...req.body }
        if (req.params.id) images.id = req.params.id

        try {
            existsOrError(images.path, 'Caminho não informado')
            existsOrError(images.idEmpresa, 'Empresa não selecionada')


        } catch (msg) {
            res.status(400).send(msg)
        }

        if (images.id) {
            app.db('images')
                .update(images)
                .where({ id: images.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('images')
                .insert(images)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('images')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }


    const get = async (req, res) => {


        const result = await app.db('images').count('id').first()
        const count = parseInt(result.count)

        app.db('images')
            .select('id', 'path', 'idEmpresa')

            .then(images => res.json({ data: images, count }))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('images')
            .select('id', 'path', 'idEmpresa')
            .where({ id: req.params.id })
            .first()
            .then(images => res.json(images))
            .catch(err => res.status(500).send(err))
    }

    const getByIdVehicles = (req, res) => {

        app.db('vehicle')
            .select({
                id_vehicle: 'vehicle.id',
                placa_vehicle: 'vehicle.placa',
                veiculo_vehicle: 'vehicle.veiculo',
                nome_images: 'images.name',
                about_images: 'images.about',
                instruction_images: 'images.instruction',
                latitude_images: 'images.latitude',
                longitude_images: 'images.longitude',
                telefone_images: 'images.telefone',
                permissao_images: 'images.permissao',
                data_permissao_images: 'images.data_permissao',
                nome_motorista: 'motorista.name',
                nome_cidade: 'cidade.name'
            })
            .leftJoin('motorista', 'motorista.id', 'vehicle.idMotorista')
            .leftJoin('images', 'images.id', 'vehicle.idimages')
            .leftJoin('cidade', 'images.idCidade', 'cidade.id')
            .where({ idimages: req.params.id })
            .then(hydration([vehicle]))
            .then(function (data) {
                res.send(data)
            })
            .catch(err => res.status(500).send(err))

    }


    return { save, remove, get, getById, getByIdVehicles }
}