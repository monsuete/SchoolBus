import React, { useState } from 'react';
import api from '../../services/api'

import VanDetail from '../../components/vanDetail/index'

import './styles.css'

export default Cadastro => {
  const [vehicles, setVehicles] = useState([]);
  const [board, setBoard] = useState(null)


  const seachVehicles = async (board) => {
    const { data } = await api.get(`/vehicle`, { params: { term: board } })

    setVehicles(data)


  }



  return (

    <div className="container">
      <div className="row">
        <div className="col-sm">



          <div className="product-list">

            {vehicles ? <VanDetail vehicles={vehicles} /> : <span></span>}
            <input placeholder="Informe a cidade" o A type="text" onChange={(e) => setBoard(e.target.value)} />
            <p />
            <div className="actions ">
              <button type="submit" disabled={!board} onClick={() => seachVehicles(board)} >Buscar</button>

            </div>



          </div>
        </div>



      </div>
    </div>
  );
}




// export default class Cadastro extends Component {

//     state = {
//         product: {}
//     }

//     async componentDidMount(){

//         const {id} = this.props.match.params

//         const response = await api.get(`/products/${id}`)

//         this.setState({product: response.data})

//     }

//     render() {

//         return (
//             <div className="product-info">
//                 <h1>Teste
//                 </h1>


//             </div>

//         )
//     }
// }