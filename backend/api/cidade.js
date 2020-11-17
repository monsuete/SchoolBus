module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const cidade = { ...req.body }
        if (req.params.id) cidade.id = req.params.id

        try {
            existsOrError(cidade.name, 'Nome do cidade nao informado')

            const cidadeFromDB = await app.db('cidade')
                .where({ name: cidade.name }).first()
            if (!cidade.id) {
                notExistsOrError(cidadeFromDB, 'cidade ja cadastrado')
            }
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }

        if (cidade.id) {
            app.db('cidade')
                .update(cidade)
                .where({ id: cidade.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('cidade')
                .insert(cidade)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('cidade')
            .select('id', 'name')
            .then(cidade => res.json(cidade))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('cidade')
            .select('id', 'name')
            .where({ id: req.params.id })
            .first()
            .then(cidade => res.json(cidade))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('cidade')
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