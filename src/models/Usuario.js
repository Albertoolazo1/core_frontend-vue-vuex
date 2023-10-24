import { getFechaActual } from "../_helpers";
import Cliente from '@/models/Cliente';

export default class Usuario {
    id = 0;
    fechaRegistro = "";
    nombre = "";
    apellidoPaterno = "";
    apellidoMaterno = "";
    username = "";
    password = "";
    esActivo = 1;
    correoElectronico = "";
    ccPerfil = {};
    ccPerfilId = 0;
    cliente = new Cliente();

    constructor(item) {
        if (item) {
            this.id = item.id;
            this.fechaRegistro = item.fechaRegistro;
            this.nombre = item.nombre;
            this.apellidoPaterno = item.apellidoPaterno;
            this.apellidoMaterno = item.apellidoMaterno;
            this.username = item.username;
            this.password = item.password;
            this.esActivo = item.esActivo;
            this.correoElectronico = item.correoElectronico;
            this.ccPerfil = item.ccPerfil;
            this.ccPerfilId = item.ccPerfilId;
            this.cliente = item.cliente ?? new Cliente();
        } else {
            this.id = 0;
            this.fechaRegistro = getFechaActual(true);
            this.nombre = "";
            this.apellidoPaterno = "";
            this.apellidoMaterno = "";
            this.username = "";
            this.password = "";
            this.esActivo = 1;
            this.correoElectronico = "";
            this.ccPerfil = {};
            this.ccPerfilId = 0;
            this.cliente = new Cliente();
        }
    }
}
