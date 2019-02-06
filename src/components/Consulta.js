/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Redirect} from "react-router";
import axios from 'axios';
import GetEmail from "./GetEmail";
import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work


const jsonConf = require('../config.json');

class Consulta extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            expJson: [],
            dataProp: this.props.location.state.data,
            resultado: true,
            vencimiento:'',
            diasFaltantes:'',
            clase:"hidden",
            tiempo:'',
            redirect:false
        }
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get(jsonConf.ip + ':' + jsonConf.port + '/api/solicitudes')
            .then(res => {
                let expJson = res.data, resultado;
                let datax = this.state.dataProp.exp;
                resultado = expJson.find((myArray) => myArray.exp === datax);
                if (this._isMounted) {
                this.setState({
                    expJson: expJson,
                    resultado: resultado
                });
                if(this.state.dataProp!==""){this.getDate();}
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    getDate =()=> {
        let vencimiento = this.state.dataProp.vencimientoTramite;
        const [vfirst, vsecond] = vencimiento.split(' ').map(item => item.trim());
        const [vday, vmonth, vyear] = vfirst.split('/');
        const vvencimiento = vday + '/' + vmonth + '/' + vyear;
        const daysFromToday = moment(vyear + vmonth + vday, "YYYYMMDD").fromNow();
        const [a,dias,c] = daysFromToday.split(' ').map(item => item.trim());
        this.setState({vencimiento: vvencimiento, diasFaltantes:daysFromToday, tiempo:vsecond});
        if(dias <= 15) {
            this.setState({clase:""})
        }
    };
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let claseResuelta, buena, email = [], numeroFinal, ojo,numero, nro, imprima, mostrar;
        if (!this.state.dataProp.exp) {

            return <Redirect to={{
                pathname: '/errorConsulta'
            }}/>;
        }
        if (!this.state.resultado && this.state.dataProp.tramiteStatus !== "RESUELTO") {
            let Showemail = email.push(<div key><GetEmail data={this.state.dataProp}/></div>);
        }
        if (this.state.dataProp.tramiteStatus === "RESUELTO") {
            nro = this.state.dataProp.disposicion;
            numero = nro.split("-");
            mostrar = "hidden";
            ojo ="hidden";
            numeroFinal = numero[0].trim();
            claseResuelta = "resuelto mb-3 mt-2 pl-2";
            buena = "buenasNoticias";
            imprima = "IMPRIMA SU DOCUMENTO";
        } else if(this.state.dataProp.tramiteStatus === "INTIMADO") {
            nro = this.state.dataProp.intimado;
            mostrar = "hidden";
            numeroFinal = nro.trim();
            claseResuelta = "resuelto mb-3 mt-2 pl-2";
            ojo = "buenasNoticias";
            buena = "hidden";
            imprima = "IMPRIMA LA INTIMACIÓN";
        } else {
            claseResuelta = 'no-resuelto card-text';
            buena = "hidden";
            ojo ="hidden";
            numeroFinal = 1;
            imprima = "IMPRIMA SU PRECARIA";
        }


        return (
            <div className="row">
                <div className="col-12">
                    <div className="card  mb-3">
                        <div className="card-header">
                            <h6 className="card-subtitle text-muted">Tramite
                                de {this.state.dataProp.apellido}, {this.state.dataProp.nombre}</h6>
                        </div>
                        <div className="card-body">
                            <h5 className={buena}>Ey! Buenas Noticias {this.state.dataProp.nombre.split(" ", 1)}...</h5>
                            <h5 className={ojo}>Ey! <b>{this.state.dataProp.nombre.split(" ", 1)}</b>... REVISA TU TRAMITE! Requiere Atención</h5>
                            <h6 className={claseResuelta + ' card-text height align-items-center d-flex'}><span
                                className="pr-2">El Status es:  </span> <span
                                className="font-weight-bold"> {this.state.dataProp.tramiteStatus}</span></h6>
                            <p className="card-subtitle mb-3">Disposición: {this.state.dataProp.disposicion}</p>
                            <p className="card-subtitle mb-3">Expediente: {this.state.dataProp.exp}</p>
                            <p className="card-subtitle mb-3">Fecha Movimiento: {this.state.dataProp.inicioTramite}</p>
                            <p className={mostrar + ' card-subtitle mb-3'}>Su precaria Vence el <span
                                className="font-500"> {this.state.dataProp.vencimientoTramite} ({this.state.diasFaltantes})                                   </span></p>
                            <p className={this.state.clase + ' card-subtitle mb-3'}>Precaria Renovada el {this.state.dataProp.precariaRenovada}</p>
                            <p className="card-subtitle mb-3">Su tramite fue realizado en <span
                                className="font-500"> {this.state.dataProp.tramiteDireccion}</span></p>

                            <form
                                action="https://www.dnm.gov.ar/sadex/accesosWebMigra/pdf_documentacion_desde_migraciones_gov_ar.php"
                                method="POST" target="_blank">
                                <input type="submit" name="imprimir_datos_2"
                                       value={imprima} className="btn btn-raised btn-warning"/>
                                <input type="hidden" name="expediente" value={ this.state.dataProp.exp }/>
                                <input type="hidden" name="numero" value={numeroFinal}/>
                                <input type="hidden" name="tipo" value={ this.state.dataProp.tipo_tramite }/>
                                <input type="hidden" name="es_favorable" value="1"/>
                            </form>
                            <div className={this.state.clase}>
                            <form
                                action="http://www.migraciones.gov.ar/accesible/consultaTramitePrecaria/renovacionPrecaria.php"
                                method="POST" target="_blank">
                                <input type="submit" name="renovPrecaria"
                                       value="Renovar Precaria" className="btn btn-raised btn-primary"/>
                                <input type="hidden" name="resultado" value={this.state.dataProp.hashPrecaria}/>
                                <input type="hidden" name="ip" value={this.state.dataProp.ip}/>
                            </form>
                            <p className="small">Recuerda realizar el tramite de renovación, luego de la hora que figura en el vencimiento de la precaria, es decir luego de las : {this.state.tiempo } </p>
                            </div>

                        </div>
                        <div>
                            {email}
                        </div>
                        <div className="form-group col-12 d-flex justify-content-center">
                            <a href="/" className="btn btn-primary">Consultar otro tramite</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Consulta;
