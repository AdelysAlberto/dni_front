import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router";
const jsonConf = require('../config.json');

class GetEmail extends Component {
    constructor(props) {
        super(props);
        this.displayData = [];
        this.state = {
            showdata: this.displayData,
            isChecked: false,
            data: this.props.data,

            email: '',
            redirectToReferrer: false,
        };
        this.appendData = this.appendData.bind(this);
        this.prependData = this.prependData.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    appendData() {
        this.displayData.push(
            <div key className="form-group col-12 mb-4">
                <div className="form-group col-12">
                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Correo Electronico</label>
                    <input type="email" required name="email" onChange={this.handleChange} id="email"
                           minLength="10"
                           className="form-control" value={this.state.exp}/>
                </div>

                <div className="form-group col-12 d-flex justify-content-center mt-4">
                    <input type="submit" className="btn btn-raised btn-info" id="buscar"
                           name="buscar"
                           width="100"
                           value="Registrar"
                           height="31"/>
                </div>
            </div>
        );
        this.setState({
            showdata: this.displayData,
        });
    }

    handleChange = event => {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    };

    prependData() {
        this.displayData.shift();
        this.setState({
            showdata: this.displayData,
        });
    }

    toggleChange() {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        if (this.state.isChecked === true) {
            this.prependData();
        } else {
            this.appendData();
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        const fecha = this.state.data.fechaNac.split("/");
        const data = {
            exp: this.state.data.exp,
            dia: fecha[0],
            mes: fecha[1],
            anio: fecha[2],
            email: this.state.email,

        };
        axios.post(jsonConf.ip + ':' + jsonConf.port + '/load', data)
            .then(res => {
                this.setState({redirectToReferrer: true});
                //console.log(res.data);
            })
            .catch(error => {
                console.log(error)
            });
    };

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to={{
                pathname: '/Succes'
            }}/>;
        }

        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-12 d-flex justify-content-center">
                            <div key className="col-12 d-flex flex-column  align-items-center  height ">
                                <div className="checkboxx col-12 flex-row justify-content-center d-flex">
                                    <label><input type="checkbox" checked={this.state.isChecked}
                                                  onChange={this.toggleChange}/> </label>
                                    <small className="text-muted">Me gustaria recibir una notifacion en mi correo,
                                        cuando el
                                        status del
                                        tramite cambie.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-12 d-flex justify-content-center">
                            {this.displayData}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default GetEmail;
