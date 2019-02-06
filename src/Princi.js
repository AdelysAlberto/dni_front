import React, {Component} from 'react';
import Consulta from './components/Consulta'
import Solicitar from './components/Solicitar'
import errorConsulta from './components/errorConsulta';
import Succes from './components/Succes';
import {BrowserRouter, Route} from "react-router-dom";
import imgInstagram from './img/instagram.png';
import imgLinkedin from './img/linkedin.png';
class Princi extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="p-2 height-70 alert-light d-flex flex-row align-items-center"
                                         role="alert"><span>Sistema de Consulta Status DNI</span></div>
                                    <Route path="/" exact component={Solicitar}/>
                                    <Route path="/Consulta" exact component={Consulta}/>
                                    <Route path="/Succes" exact component={Succes}/>
                                    <Route path="/errorConsulta" exact component={errorConsulta}/>

                                    <footer className=" d-flex  socialnetworks">
                                        <div className="flex-row col-12 ">
                                        <div className=" blockquote-footer d-flex col-12 justify-content-center"> Design by:
                                        <cite title="Mi Perfil">
                                            <a target="_blank" href="https://www.linkedin.com/in/adelysalberto/"
                                            rel="noopener noreferrer" className="ml-2">
                                                 Adelys Belen  </a>
                                            <a target="_blank" href="https://www.linkedin.com/in/adelysalberto/"
                                               rel="noopener noreferrer"><img src={imgLinkedin} alt="linkedin" /></a>
                                            <a target="_blank" href="https://www.instagram.com/adelysalberto"
                                               rel="noopener noreferrer"><img src={imgInstagram} alt="instagram"/></a>
                                        </cite>
                                        </div>
                                        <div className="d-flex col-12 justify-content-center blockquote-footer  ">Venezolano en Argentina</div>
                                        </div>
                                    </footer>
                                </div>

                            </div>
                        </div>
                    </div>
                </BrowserRouter>

            </div>
        );
    }
}

export default Princi;
