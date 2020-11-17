import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import mapIcons from '../../utils/mapIcons'

import api from '../../services/api'

import './Company.css';
import Sidebar from "../../components/sidebar.tsx/Sidebar";





interface Vehicle {
  id: number;
  placa: string;
  veiculo: string;
  motorista: {
    nome: string;
  }
  empresa: {
    nome: string;
    about: string;
    instruction: string;
    latitude: number;
    longitude: number;
    telefone: number;
    permissao: string;
    data_permissao: string;
    cidade: {
      nome: string;
    }
  }

}

function Company() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [empresa, setEmpresa] = useState<any>({})
  const { id } = useParams<any>()

  console.log(empresa);


  useEffect(() => {
    const fetchData = async () => {
      const { data: empresa } = await api.get(`/empresa/${id}`)
      const { data: vehicles } = await api.get(`/empresa/${empresa.id}/vehicle`)


      setEmpresa(empresa)
      setVehicles(vehicles)
    }

    fetchData()
  }, [id])



  return (
    <div id="page-orphanage">

      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
          </div>

          <div className="orphanage-details-content">
            <h1>{empresa.name}</h1>
            <p>{empresa.about}</p>

            <div className="map-container">


              {empresa.id ? (

                <Map
                  center={[empresa.latitude, empresa.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9uc3VldGUiLCJhIjoiY2tnbHBneXQ0MTJjNDJ1cGQ0aXU2ZGd5bCJ9.1FAYfClp7uTq9YnA0DWBOg"
                  />



                  <Marker interactive={false} icon={mapIcons} position={[empresa.latitude, empresa.longitude]} />



                </Map>

              ) : <span>Carregando</span>}

              <footer>
                <a href={`http://maps.google.com/maps?q=loc:${empresa.latitude},${empresa.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Informações</h2>
            <p>{empresa.instruction}</p>

            <div >
              <div className="hour">

                <br />
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

              </div>

            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Company