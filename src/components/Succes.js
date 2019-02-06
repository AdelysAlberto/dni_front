/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
class Consulta extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card  mb-3">
                        <div className="card-header">
                            Sus datos han sido almacenado, pronto estara recibiendo información de su DNI
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
