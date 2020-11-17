// import React, { Component } from 'react'

// import { Map, Marker,  GoogleApiWrapper, InfoWindow} from 'google-maps-react';

// import bus from '../../assets/images/buss.svg'



// import './styles.css'


// class SimpleMap extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//           stores: [
//             { latitude: -15.7646029, longitude: -47.8964332, local: "Brasilia" },
//             { latitude: -15.8694186, longitude: -47.9206231, local: "Aeroporto de Brasilia" },]
//         }
//       }

//       displayMarkers = () => {
//         return this.state.stores.map((store, index) => {
//           return <Marker key={index} id={index} position={{
//             lat: store.latitude,
//             lng: store.longitude
//           }}
//           />
//         })
//       }
//     // static defaultProps = {
//     //     center: {
//     //         lat: -15.7646029,
//     //         lng: -47.8964332
//     //     },
//     //     zoom: 12
//     // };




//     render() {

//         return (
//             // Important! Always set the container height explicitly
//             <div id="page-map">


//                 {/* <div className="d-flex flex-row justify-items-center align-items-center search p-2 m-4">
//                             <span className="mr-2" role="img" aria-label="icon">😃</span>
//                             <input type="text" placeholder="Pesquisar no school bus" />

//                         </div> */}
//                 <aside>
//                     <header>
//                         <p>

//                             <img src={bus} alt="School Bus" />
//                         </p>

//                         <h2>Escolha uma empresa de ônibus escolar no mapa</h2>
//                         <p>Escolha o melhor para o seu filho</p>
//                     </header>

//                     <footer>
//                         <strong>Brasilia </strong>
//                         <span>Distrito Federal</span>
//                     </footer>
//                 </aside>
//                 <div className="maps">
//                     <Map
//                         google={this.props.google}
//                         zoom={7}
//                         initialCenter={{ lat: -15.7646029, lng: -47.8964332 }}
//                     >
//                     {this.displayMarkers()}
//                     </Map>
//                 </div>
//             </div>
//         );
//     }
// }

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyAlobLgcbBZ4T9zMEjLo5TqRPp3g5k_bxw")
// })(SimpleMap)


import React, { useEffect, useState } from 'react'



import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { FiArrowRight } from 'react-icons/fi'
import bus from '../../assets/images/buss.svg'

import api from '../../services/api'


import './styles.css'
import mapIcon from '../../utils/mapIcons'



function Mapas() {
    const [companies, setCompany] = useState([]);


    useEffect(() => {
        api.get('/empresa').then(({ data: response }) => {
            setCompany(response.data)

        })
    }, [])




    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={bus} alt="School Bus" />

                    <h2>Escolha uma Empresa</h2>
                    <p>Seus filho merece o melhor :)</p>
                </header>
                <footer>
                    <strong>Brasília</strong>
                    <span>Distrito Federal</span>
                </footer>
            </aside>

            <Map

                center={[-15.7646029, -47.8964332]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9uc3VldGUiLCJhIjoiY2tnbHBneXQ0MTJjNDJ1cGQ0aXU2ZGd5bCJ9.1FAYfClp7uTq9YnA0DWBOg"
                />


                {companies.map(company => (
                    <Marker
                        icon={mapIcon}
                        position={[company.latitude, company.longitude]}
                    >
                        <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                            {company.name}
                            <Link to={`/company/${company.id}`}>
                                <FiArrowRight size={28} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}

            </Map>



        </div>
    )
}


export default Mapas
