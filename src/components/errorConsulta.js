import React, {Component} from 'react';

class errorConsulta extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card ">
                        <div
                            className="alert alert-danger d-flex flex-column align-items-center justify-content-center">
                            <span className="mb-2">ERROR TRAMITE! </span>
                            <span className="">Debe corregir los datos del Expediente</span>
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

export default errorConsulta;
