const empresa = require('./empresa')

module.exports = {
    id: { column: 'id_vehicle' },
    placa: { column: 'placa_vehicle' },
    veiculo: { column: 'veiculo_vehicle' },
    empresa,
    motorista: {
        nome: { column: 'nome_motorista' }
    },
}

