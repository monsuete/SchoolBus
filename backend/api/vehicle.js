const { hydration, vehicle } = require('../definitions')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const vehicle = { ...req.body }
        if (req.params.id) vehicle.id = req.params.id

        try {
            existsOrError(vehicle.placa, 'Placa não informado')
            existsOrError(vehicle.veiculo, 'Marca do veiculo não informada')
            existsOrError(vehicle.idEmpresa, 'empresa não informado')
            existsOrError(vehicle.idMotorista, 'Motorista não informada')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (vehicle.id) {
            app.db('vehicle')
                .update(vehicle)
                .where({ id: vehicle.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('vehicle')
                .insert(vehicle)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('vehicle')
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
        const query = app.db('vehicle')
            .select({
                id_vehicle: 'vehicle.id',
                placa_vehicle: 'vehicle.placa',
                veiculo_vehicle: 'vehicle.veiculo',
                nome_empresa: 'empresa.name',
                about_empresa: 'empresa.about',
                instruction_empresa: 'empresa.instruction',
                latitude_empresa: 'empresa.latitude',
                longitude_empresa: 'empresa.longitude',
                telefone_empresa: 'empresa.telefone',
                permissao_empresa: 'empresa.permissao',
                data_permissao_empresa: 'empresa.data_permissao',
                nome_motorista: 'motorista.name',
                nome_cidade: 'cidade.name'
            })
            .leftJoin('motorista', 'motorista.id', 'vehicle.idMotorista')
            .leftJoin('empresa', 'empresa.id', 'vehicle.idEmpresa')
            .leftJoin('cidade', 'empresa.idCidade', 'cidade.id')

        if (req.query.term) {
            query.where('vehicle.placa', 'ilike', `%${req.query.term}%`)
                .orWhere('empresa.name', 'ilike', `%${req.query.term}%`)
                .orWhere('cidade.name', 'ilike', `%${req.query.term}%`)
        }

        //.then(table => NestHydrationJS.nest(table, [vehicle]))
        query.then(hydration([vehicle]))
            .then(function (data) {
                res.send(data)
            })

        // Taguatinga      Ta%gua%
    }

    const getById = (req, res) => {
        app.db('vehicle')
            .where({ id: req.params.id })
            .first()
            .then(vehicle => {
                vehicle.content = vehicle.content.toString()
                return res.json(vehicle)
            })
            .catch(err => res.status(500).send(err))
    }





    return { save, remove, get, getById }
}