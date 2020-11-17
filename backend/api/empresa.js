// const queries = require('./queries')

// module.exports = app => {
//     const { existsOrError } = app.api.validation

//     const save = (req, res) => {
//         const empresa = { ...req.body }
//         if(req.params.id) empresa.id = req.params.id

//         try {
//             existsOrError(empresa.name, 'Nome da empresa não informado')
//             existsOrError(empresa.permissao, 'permissao não informado')
//             existsOrError(empresa.validade_permissao, 'Data de validade da permissao nao informado')
//             existsOrError(empresa.idMotorista, 'Escolha um motorista')
//             existsOrError(empresa.idCidade, 'Escolha cidade de prestação de serviço')
//             existsOrError(empresa.idVeiculos, 'Escolha o veiculo')
//         } catch(msg) {
//             res.status(400).send(msg)
//         }

//         if(empresa.id) {
//             app.db('empresa')
//                 .update(empresa)
//                 .where({ id: empresa.id })
//                 .then(_ => res.status(204).send())
//                 .catch(err => res.status(500).send(err))
//         } else {
//             app.db('empresa')
//                 .insert(empresa)
//                 .then(_ => res.status(204).send())
//                 .catch(err => res.status(500).send(err))
//         }
//     }

//     const remove = async (req, res) => {
//         try {
//             const rowsDeleted = await app.db('empresa')
//                 .where({ id: req.params.id }).del()

//             try {
//                 existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
//             } catch(msg) {
//                 return res.status(400).send(msg)    
//             }

//             res.status(204).send()
//         } catch(msg) {
//             res.status(500).send(msg)
//         }
//     }

//     const get = async (req, res) => {


//         const result = await app.db('empresa').count('id').first()
//         const count = parseInt(result.count)

//         app.db('empresa')
//             .select('id', 'name', 'permissao', 'validade_permissao','idMotorista', 'idVeiculos', 'idCidade')
//             .then(empresa => res.json({ data: empresa, count, limit }))
//             .catch(err => res.status(500).send(err))
//     }

//     const getById = (req, res) => {
//         app.db('empresa')
//             .where({ id: req.params.id })
//             .first()
//             .then(empresa => {
//                 empresa.content = empresa.content.toString()
//                 return res.json(empresa)
//             })
//             .catch(err => res.status(500).send(err))
//     }

//     const getByVehicles = async (req, res) => {
//         const idVeiculos = req.params.id
//         const vehicles = await app.db.raw(queries.vehiclesWithChildren, idVeiculos)
//         const ids = vehicles.rows.map(c => c.id)

//         app.db({e: 'empresa', v: 'vehicles'})
//             .select('e.id', 'e.name', 'e.permissao', 'e.validade_permissao', { placa: 'v.name', veiculo: 'v.tipo' })
//             .whereRaw('?? = ??', ['v.id', 'e.idVeiculos'])
//             .whereIn('idVeiculos', ids)
//             .orderBy('e.id', 'desc')
//             .then(empresa => res.json(empresa))
//             .catch(err => res.status(500).send(err))
//     }

//     return { save, remove, get, getById, getByVehicles }
// }

// module.exports = app => {
//     const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation



//     const save = async (req, res) => {
//         const empresa = { ...req.body }
//         if(req.params.id) empresa.id = req.params.id

//         try {
//             existsOrError(empresa.name, 'Nome da empresa não informado')
//             existsOrError(empresa.permissao, 'permissao não informado')
//             existsOrError(empresa.validade_permissao, 'Data de validade da permissao nao informado')
//             existsOrError(empresa.idCidade, 'Escolha uma Cidade')



//             const empresaFromDB = await app.db('empresa')
//                 .where({ name: empresa.name }).first()
//             if(!empresa.id) {
//                 notExistsOrError(empresaFromDB, 'Empresa já cadastrada')
//             }
//         } catch(msg) {
//             return res.status(400).send(msg)
//         }



//         if(empresa.id) {
//             app.db('empresa')
//                 .update(empresa)
//                 .where({ id: empresa.id })
//                 .whereNull('deletedAt')
//                 .then(_ => res.status(204).send())
//                 .catch(err => res.status(500).send(err))
//         } else {
//             app.db('empresa')
//                 .insert(empresa)
//                 .then(_ => res.status(204).send())
//                 .catch(err => res.status(500).send(err))
//         }
//     }

//     const get = (req, res) => {
//         app.db('empresa')
//             .select('id', 'name', 'permissao', 'validade_permissao','idCidade' )
//             .then(empresa => res.json(empresa))
//             .catch(err => res.status(500).send(err))
//     }

//     const getById = (req, res) => {
//         app.db('empresa')
//             .select('id', 'name', 'permissao', 'validade_permissao','idCidade' )
//             .where({id: req.params.id})
//             .first()
//             .then(empresa => res.json(empresa))
//             .catch(err => res.status(500).send(err))
//     }

//     const getByVehicles = (req, res) => {


//         app.db('empresa')
//             .innerJoin('vehicles', 'empresa.idVeiculos', 'idVeiculos')
//             .where('empresa.idVeiculos', req.params.id)
//             .then(function(data) {
//                 res.send(data)
//             })

//     }

//     return { save, get, getById}
// }

const { hydration, vehicle } = require('../definitions')

module.exports = app => {
    const { existsOrError } = app.api.validation


    const save = (req, res) => {
        const empresa = { ...req.body }
        if (req.params.id) empresa.id = req.params.id

        try {
            existsOrError(empresa.name, 'Nome não informado')
            existsOrError(empresa.about, 'sobre não informada')
            existsOrError(empresa.instruction, 'informaççoes não informada')
            existsOrError(empresa.permissao, 'Permissao não informada')
            existsOrError(empresa.latitude, 'Latitude não informada')
            existsOrError(empresa.longitude, 'longitude não informada')
            existsOrError(empresa.telefone, 'telefone não informada')
            existsOrError(empresa.data_permissao, 'data de validade da permissao não informado')
            existsOrError(empresa.idCidade, 'Cidade não informada')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (empresa.id) {
            app.db('empresa')
                .update(empresa)
                .where({ id: empresa.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('empresa')
                .insert(empresa)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('empresa')
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


        const result = await app.db('empresa').count('id').first()
        const count = parseInt(result.count)

        app.db('empresa')
            .select('id', 'name', 'about', 'instruction', 'latitude', 'longitude', 'telefone', 'permissao', 'data_permissao', 'idCidade')

            .then(empresa => res.json({ data: empresa, count }))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('empresa')
            .select('id', 'name', 'about', 'instruction', 'latitude', 'longitude', 'telefone', 'permissao', 'data_permissao', 'idCidade')
            .where({ id: req.params.id })
            .first()
            .then(empresa => res.json(empresa))
            .catch(err => res.status(500).send(err))
    }

    const getByIdVehicles = (req, res) => {

        app.db('vehicle')
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
            .where({ idEmpresa: req.params.id })
            .then(hydration([vehicle]))
            .then(function (data) {
                res.send(data)
            })
            .catch(err => res.status(500).send(err))

    }
    // const getById = (req, res) => {
    //     app.db('empresa')
    //         .select({
    //             id: 'id',
    //             nome_empresa: 'empresa.name'

    //         })
    //         .where({ id: req.params.id })
    //         .first()
    //         .then(hydration(empresa))
    //         .then(empresa => {
    //             return res.json(empresa)
    //         })
    //         .catch(err => res.status(500).send(err))
    // }

    const getByCidade = (req, res) => {


        app.db('empresa')
            .innerJoin('cidade', 'empresa.idCidade', 'idCidade')
            .where('empresa.idCidade', req.params.id)
            .then(function (data) {
                res.send(data)
            })

    }


    return { save, remove, get, getById, getByCidade, getByIdVehicles }
}