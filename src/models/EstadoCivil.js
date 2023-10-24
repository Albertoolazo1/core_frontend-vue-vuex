export default class EstadoCivil {
    id = 0;
    clave = "00"
    nombre = "";
    porcentajeAsignacionesFamiliares = 0;
    porcentajePensionViudez = 0;
    esActivo = 1;

    constructor(item) {
        if (item) {
            this.id = item.id;
            this.nombre = item.nombre;
            this.clave = item.clave;
            this.porcentajeAsignacionesFamiliares = item.porcentajeAsignacionesFamiliares;
            this.porcentajePensionViudez = item.porcentajePensionViudez;
            this.esActivo = item.esActivo;
        } else {
            this.id = 0;
            this.nombre = "";
            this.clave = "";
            this.porcentajeAsignacionesFamiliares = 0;
            this.porcentajePensionViudez = 0;
            this.porcentajePensionViudez = 1;
        }
    }
}