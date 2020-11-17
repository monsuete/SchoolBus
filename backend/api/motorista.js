module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation



    const save = async (req, res) => {
        const motorista = { ...req.body }
        if (req.params.id) motorista.id = req.params.id

        try {
            existsOrError(motorista.name, 'Nome do motorista nao informado')



            const motoristaFromDB = await app.db('motorista')
                .where({ name: motorista.name }).first()
            if (!motorista.id) {
                notExistsOrError(motoristaFromDB, 'Motorista ja cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }



        if (motorista.id) {
            app.db('motorista')
                .update(motorista)
                .where({ id: motorista.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('motorista')
                .insert(motorista)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('motorista')
            .select('id', 'name')
            .then(motorista => res.json(motorista))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('motorista')
            .select('id', 'name')
            .where({ id: req.params.id })
            .first()
            .then(motorista => res.json(motorista))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('motorista')
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



    return { save, get, getById, remove }
}