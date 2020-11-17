import React, { useState, FormEvent } from "react";
import api from "../../services/api";

import { useHistory } from 'react-router-dom'
import './Veiculo.css';
import Sidebar from "../../components/sidebar.tsx/Sidebar";


export default function CreateOrphanage() {
    const history = useHistory()

    const [placa, setPlaca] = useState('')
    const [veiculo, setveiculo] = useState('')
    const [idEmpresa, setIdEmpresa] = useState('')
    const [idMotorista, setidMotorista] = useState('')




    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const data = new FormData();

        data.append('placa', placa)
        data.append('veiculo', veiculo)
        data.append('idEmpresa', String(idEmpresa))
        data.append('idMotorista', String(idMotorista))

        await api.post('vehicle', data).then(response => { })

        alert('Veiculo cadastrado com sucesso!.')

        history.push('/line')
    }

    return (
        <div id="page-create-orphanage">

            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">

                    <fieldset>
                        <legend>Veiculo</legend>
                        <div className="input-block">
                            <label htmlFor="opening_hours">Placa do Veiculo</label>
                            <input
                                id="opening_hours"
                                value={placa}
                                onChange={event => setPlaca(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="opening_hours">Marca do Veiculo</label>
                            <input
                                id="opening_hours"
                                value={veiculo}
                                onChange={event => setveiculo(event.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="opening_hours">Informe a Empresa que o veiculo pertence</label>
                            <select id="opening_hours"
                                value={idEmpresa}
                                onChange={event => setIdEmpresa(event.target.value)}
                            >
                                <option selected></option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div className="input-block">
                            <label htmlFor="opening_hours">Informe o motorista </label>
                            <select id="opening_hours"
                                value={idMotorista}
                                onChange={event => setidMotorista(event.target.value)}
                            >
                                <option selected></option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>


                        <button className="confirm-button" type="submit">
                            Confirmar
                        </button>
                    </fieldset>
                </form>
            </main>
        </div >
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
