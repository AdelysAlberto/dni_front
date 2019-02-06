import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import logo from '../img/date.svg';
import 'react-datepicker/dist/react-datepicker.css';

const jsonConf = require('../config.json');

class Solicitar extends Component {
    constructor() {
        super();
        this.state = {
            exp: '',
            dia: '',
            mes: '',
            anio: '',
            resPost: '',
            startDate: moment(),
            isOpen: '',
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date,
            dia: moment(date).format('DD'),
            mes: moment(date).format('MM'),
            anio: moment(date).format('YYYY')
        });
        this.toggleCalendar();
    }

    toggleCalendar(e) {
        e && e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    }

    handleChange = event => {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    };

    handleSubmit = event => {
        event.preventDefault();
        const data = {
            exp: this.state.exp,
            dia: this.state.dia,
            mes: this.state.mes,
            anio: this.state.anio,
        };
        if (data.exp.length <= 6) {
            alert("Revise su Numero de Expediente");
            return false;
        }

        axios.post(jsonConf.ip + ':' + jsonConf.port + '/giveme', data)
            .then(res => {
                this.setState({resPost: res.data});
                this.setState({redirect: true});
            })
            .catch(error => {
                console.log(error)
            });
    };

    render() {
        const {redirect} = this.state,
            data = this.state.resPost;
        if (redirect) {
            return <Redirect to={{
                pathname: '/Consulta',
                state: {data: data}
            }}/>;
        }
        return (
            <div className="card d-flex justify-content-center bg-white mb-3">
                <div className=" p-4">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="card-title">Consulta Tramite DNI</h5>
                        </div>
                        <div className="col-12 ">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="form-group col-12 mb-4">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Nro
                                            Expediente</label>
                                        <input required name="exp" onChange={this.handleChange} id="exp"
                                               type="number" minLength="10" user-scalable="0"
                                               className="form-control" value={this.state.exp} pattern="\d*"/>
                                        <span
                                            className="bmd-help">Debe indicar correctamente el Numero de expediente</span>
                                    </div>
                                    <div
                                        className="form-group col-12 col-md-12 d-flex flex-row align-items-center mb-4">
                                        <span className="mr-2"> Fecha Nac. </span>
                                        <button
                                            className="btn btn-raised btn-secondary fa-calendar"
                                            user-scalable="0"
                                            onClick={this.toggleCalendar}>
                                            <img alt="Fecha Nacimiento" className="pd-2 mr-2 color-img-invert"
                                                 src={logo}/>
                                            {this.state.startDate.format("DD-MM-YYYY")}
                                        </button>
                                        {
                                            this.state.isOpen && (
                                                <DatePicker
                                                    placeholderText="Indique Fecha"
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChangeDate}
                                                    withPortal
                                                    inline
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                            )
                                        }
                                    </div>

                                    <div className="form-group col-12 d-flex justify-content-center mt-4">
                                        <input type="submit" className="btn btn-raised btn-info" id="buscar"
                                               name="buscar"
                                               width="100"
                                               value="Consultar"
                                               height="31"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Solicitar;
