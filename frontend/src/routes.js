import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Main from './pages/main'

import Line from './pages/line'

import Cadastro from './pages/cadastro'
import CreateCompany from './pages/create-company/CreateCompany'
import Company from './pages/company/Company'
import Empresa from './components/empresa/Empresa'
import Motorista from './components/motorista/Motorista'
import Veiculo from './components/veiculo/Veiculo'




const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/line" component={Line} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/company/create" component={CreateCompany} />
            <Route path="/company/:id" component={Company} />
            <Route path="/empresa" component={Empresa} />
            <Route path="/motorista" component={Motorista} />
            <Route path="/veiculo" component={Veiculo} />
        </Switch>
    </BrowserRouter>
)

export default Routes