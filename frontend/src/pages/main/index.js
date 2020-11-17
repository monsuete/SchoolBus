import React from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/school.svg';
import landingImg from '../../assets/images/escolar2.svg';


import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { FaBusAlt } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si';




import './styles.css';

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img className="img-fluid" src={logoImg} alt="ProffyS" />
          <h2>Seu filho merece o melhor.</h2>
        </div>
        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/line" className="study" >
            <SiGooglemaps />
                    Consultar Mapa
                </Link>

          <Link to="/cadastro" className="give-class" >
            <FaBusAlt />
                    Consultar Dados
                </Link>
          <Link to="/company/create" className="permissionario" >
            <img src={giveClassesIcon} alt="Dar aulas" />
                    Cadastro
          </Link>
        </div>
        <div>

        </div>

        <span className="total-connections">
          Total de 200 conexões já realizadas
                <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>

      </div>
    </div>

  );
}

export default Landing;

