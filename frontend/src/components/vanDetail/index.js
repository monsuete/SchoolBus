import React from 'react'


const VanDetail = ({ vehicles }) => {
  return (
    <div className="product-list">


      <article>

        <table className="table">
          <thead className="titulos">
            <tr className="table-active">

              <th scope="col">Empresa</th>
              <th scope="col">Telefone</th>
              <th scope="col">Motorista</th>
              <th scope="col">Veiculo</th>
              <th scope="col">Numero da Permissão</th>
              <th scope="col">Data da Permissão</th>
              <th scope="col">Cidade</th>


            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} >

                <td> {vehicle.empresa.nome} </td>
                <td> {vehicle.empresa.telefone} </td>
                <td> {vehicle.motorista.nome} </td>
                <td> {vehicle.veiculo} </td>
                <td> {vehicle.empresa.permissao} </td>
                <td> {vehicle.empresa.data_permissao} </td>
                <td> {vehicle.empresa.cidade.nome} </td>

              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>


  )

}

export default VanDetail