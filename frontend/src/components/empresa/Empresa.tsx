import React, { useState, FormEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import api from "../../services/api";
import { LeafletMouseEvent } from "leaflet"


import Sidebar from "../../components/sidebar.tsx/Sidebar";
import mapIcon from "../../utils/mapIcons";




export default function CreateOrphanage() {
    const history = useHistory()

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [instruction, setInstruction] = useState('')
    const [telefone, setTelefone] = useState('')
    const [permissao, setPermissao] = useState('')
    const [data_permissao, setDataPermissao] = useState('')
    const [idCidade, setIdCidade] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const { latitude, longitude } = position

        const data = new FormData();

        data.append('name', name)
        data.append('about', about)
        data.append('instruction', instruction)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('telefone', telefone)
        data.append('permissao', String(permissao))
        data.append('data_permissao', data_permissao)
        data.append('idCidade', String(idCidade))

        await api.post('empresa', data).then(response => { })

        alert('Empresa Cadastrada com sucesso!')

        history.push('/motorista')
    }

    function handlerMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng
        setPosition({
            latitude: lat,
            longitude: lng
        });


    }



    return (
        <div id="page-create-orphanage">

            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">

                    <fieldset>
                        <legend>Empresa</legend>

                        <Map
                            center={[-15.7646029, -47.8964332]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onclick={handlerMapClick}
                        >
                            <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9uc3VldGUiLCJhIjoiY2tnbHBneXQ0MTJjNDJ1cGQ0aXU2ZGd5bCJ9.1FAYfClp7uTq9YnA0DWBOg"
                            />
                            {position.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[
                                        position.latitude,
                                        position.longitude
                                    ]}
                                />
                            )}

                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="name">Missão da Empresa</label>
                            <input
                                id="name"
                                value={about}
                                onChange={event => setAbout(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">telefone</label>
                            <input
                                id="name"
                                value={telefone}
                                onChange={event => setTelefone(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Permissão</label>
                            <input
                                id="name"
                                value={permissao}
                                onChange={event => setPermissao(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Data de vencimento da Permissão</label>
                            <input
                                id="name"
                                value={data_permissao}
                                onChange={event => setDataPermissao(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Breve apresentação da empresa <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={instruction}
                                onChange={event => setInstruction(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Informe a cidade de atuação da empresa </label>
                            <select id="opening_hours"
                                value={idCidade}
                                onChange={event => setIdCidade(event.target.value)}>
                                <option selected></option>
                                <option>1</option>
                            </select>
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="uploaded-image">

                            </div>


                            <button className="new-image">
                                <FiPlus size={24} color="#15b6d6" />
                            </button>
                        </div>
                        <button className="confirm-button" type="submit">
                            Confirmar
                        </button>
                        <button className="confirm-button" type="submit">
                            <Link to="/Motorista" className="confirm-button" >
                                Next
                            </Link>
                        </button>
                    </fieldset>

                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
