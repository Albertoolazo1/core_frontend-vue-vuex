export default class Calendario {
    id = 0;
    nombre = '';
    descripcion = '';
    anio = '';
    events = [];

    constructor(item) {
        if (item) {            
            this.id = item.id;
            this.nombre = item.nombre;
            this.descripcion = item.descripcion;
            this.anio = item.anio;
            this.events = item.events;
        } else {
            this.id = 0;
            this.nombre = '';
            this.descripcion = '';
            this.anio = '';
            this.events = [];
        }
    }
}