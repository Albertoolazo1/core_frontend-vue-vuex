import EstadoCivil from "./EstadoCivil";
import { getFechaActual, } from "../_helpers"

export default class Cliente {
    id = 0;
    nombre = "";
    apellidoPaterno = "";
    apellidoMaterno = "";
    fechaNacimiento = "";
    edad = 0;
    sexo = "";
    email = "";
    telefono = "";
    numeroDependientes = 0;
    ingresoMensual = "";
    ccEstadoCivil = new EstadoCivil();
    ccEstadoCivilClave = "";
    fechaRegistro = getFechaActual(true);
    usuarioId = 0;
    agenteId = 0;
    realizoCompra = 0;
    acudioSegundaCita = 0;

    constructor(item) {
        if (item) {
            this.id = item.id
            this.nombre = item.nombre ?? "";
            this.apellidoPaterno = item.apellidoPaterno ?? "";
            this.apellidoMaterno = item.apellidoMaterno ?? "";
            this.fechaNacimiento = item.fechaNacimiento
            this.edad = item.edad
            this.sexo = ""
            this.email = item.email
            this.telefono = item.telefono
            this.numeroDependientes = item.numeroDependientes
            this.ingresoMensual = item.ingresoMensual ?? ""
            this.ccEstadoCivil = item.ccEstadoCivil ?? new EstadoCivil()
            this.ccEstadoCivilClave = item.ccEstadoCivilClave
            this.fechaRegistro = item.fechaRegistro
            this.usuarioId = item.usuarioId;
            this.agenteId = item.agenteId;
            this.realizoCompra = item.realizoCompra;
            this.acudioSegundaCita = item.acudioSegundaCita;
        } else {
            this.id = 0;
            this.nombre = "";
            this.apellidoPaterno = "";
            this.apellidoMaterno = "";
            this.fechaNacimiento = "";
            this.edad = 0;
            this.sexo = "";
            this.email = "";
            this.telefono = "";
            this.numeroDependientes = 0;
            this.ingresoMensual = "";
            this.ccEstadoCivil = new EstadoCivil();
            this.ccEstadoCivilClave = "";
            this.fechaRegistro = getFechaActual(true);
            this.usuarioId = 0;
            this.agenteId = 0;
            this.realizoCompra = 0;
            this.acudioSegundaCita = 0;
        }
    }

    validate() {
        let esValido = false;

        if (this.nombre != '') {
            if (this.apellidoPaterno != '') {
                if (this.apellidoMaterno != '') {
                    if (this.edad >= 18 && this.edad < 100) {
                        if (this.telefono != '') {
                            if (this.email != '') {
                                if (this.ccEstadoCivilClave && this.ccEstadoCivilClave != '') {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        return esValido;
    }
}