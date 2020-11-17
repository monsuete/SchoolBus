import React, { useState, FormEvent } from "react";
import { Link, useHistory } from 'react-router-dom'
import './create-company.css';
import Sidebar from "../../components/sidebar.tsx/Sidebar";
import api from "../../services/api";

export default function CreateOrphanage() {
  const history = useHistory()

  const [name, setName] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = new FormData();

    data.append('name', name)

    await api.post('cidade', data).then(response => { })

    alert('Cidade cadastrada com sucesso!')

    history.push('/empresa')
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <fieldset>
              <legend>Cidade</legend>
              <div className="input-block">
                <label htmlFor="opening_hours">Cidade</label>
                <input
                  id="opening_hours"
                  value={name}
                  onChange={event => setName(event.target.value)} />
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
            </button>
            <button className="confirm-button" type="submit">
              <Link to="/empresa" className="confirm-button" >
                Next
              </Link>
            </button>
          </fieldset>
        </form>
      </main>
    </div >
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
