import React, { useState, FormEvent } from "react";
import api from "../../services/api";


import Sidebar from "../../components/sidebar.tsx/Sidebar";
import { Link, useHistory } from 'react-router-dom'


export default function CreateOrphanage() {
    const history = useHistory()

    const [name, setName] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const data = new FormData();

        data.append('name', name)

        await api.post('motorista', data).then(response => { })

        alert('Motorista cadastrado com sucesso!.')

        history.push('/veiculo')
    }

    return (
        <div id="page-create-orphanage">

            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Motorista</legend>
                        <div className="input-block">
                            <label htmlFor="opening_hours">Motorista</label>
                            <input
                                id="opening_hours"
                                value={name}
                                onChange={event => setName(event.target.value)} />
                        </div>
                        <button className="confirm-button" type="submit">
                            Confirmar
                        </button>
                        <button className="confirm-button" type="submit">
                            <Link to="/veiculo" className="confirm-button" >
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
