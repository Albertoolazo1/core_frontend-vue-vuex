import Calendario from "@/models/Agenda/Calendario";
import Evento from "@/models/Agenda/Evento";

const state = {
    calendarioDiasFestivos: new Calendario(),
    verFormAgregarCalendario: false,
    eventos: [],
    itemPaisSeleccionado: {},
    esCopiar: false,
    loadingObtenerDatos: false,
    loadingEnviarDatos: false,
    calendarios: [],
    indexCalendario: -1,

    //menu-card-event
    menuEdit: false,
    evento: new Evento(),
    eventoEdit: new Evento()
}

const actions = {
    obtenerCalendarios({ dispatch }) {
        let itemRequest = {
            esActivoUno: 0,
            esActivoDos: 1
        };

        dispatch("diasFestivosData/obtenerCalendariosDiasFestivos", itemRequest, { root: true })
    },
    successObtenerCalendarios({ commit }, value) {
        if (value.length > 0) {
            commit("mutateCalendarios", value);
        } 
    },
    toggleEsCopiar({ commit }, value) {
        commit("mutateEsCopiar", value);
    },
    toggleVerFormAgregarCalendario({ commit }, value) {
        if (!value) {
            commit('mutateIndexCalendario', -1);
        }
        commit("mutateVerFormAgregarCalendario", value);
    },
    seleccionarItemPais({ commit }, value) {
        commit("mutateItemPaisSeleccionado", value);
    },
    procesarCalendarios({ commit }, value) {
        for (let i = 0; i < value.length; i++) {
            const calendario = value[i];
            let events = [];

            if (calendario.valoresCCCalendarioDiasFestivosList) {
                const eventosAux = calendario.valoresCCCalendarioDiasFestivosList;

                for (let j = 0; j < eventosAux.length; j++) {
                    const eventoAux = eventosAux[j];
                    const event = {
                        id: eventoAux.id,
                        start: eventoAux.fechaFestiva,
                        name: eventoAux.descripcion,
                        color: eventoAux.color == null ? 'blue' : eventoAux.color,
                    };

                    events.push(event);
                }
            }

            calendario.events = events;
        }
        commit("mutateCalendarios", value);
    },
    copiarCalendarioDiasFestivos({ commit }, value) {
        let calendarioAux = new CalendarioDiasFestivos(value);
        calendarioAux.id = 0;
        calendarioAux.ccPais = {};
        calendarioAux.ccPaisId = 0;
        calendarioAux.anio = "";

        commit("mutateCalendarioDiasFestivos", calendarioAux);
        commit('mutateVerFormAgregarCalendario', true);
    },
    seleccionarCalendarioDiasFestivos({ commit }, value) {
        if (value) {

            commit("mutateCalendarioDiasFestivos", value);
        } else {
            commit("mutateCalendarioDiasFestivos", new CalendarioDiasFestivos());
        }
    },

    editarCalendario({ commit }, item) {
        const id = item.id ? item.id : -1;
        
        commit('mutateCalendarioDiasFestivos', item);
        commit('mutateIndexCalendario', id);

        commit('mutateVerFormAgregarCalendario', true);
    },
    guardarCalendario({ dispatch }) {
        state.calendarioDiasFestivos.ccPaisId = state.calendarioDiasFestivos.ccPais.id;
        let eventos = state.calendarioDiasFestivos.events;
        let eventosAuxiliar = [];
       
        eventos.forEach(evento => {
            let eventoAux = new DiaFestivo(evento);
            eventoAux.ccCalendarioDiasFestivosId = state.calendarioDiasFestivos.id;
            eventoAux.id = evento.id;
            eventoAux.fechaFestiva = evento.start;
            eventoAux.descripcion = evento.name;
            eventoAux.color = evento.color;

            delete eventoAux.start;
            delete eventoAux.name;

            eventosAuxiliar.push(eventoAux);
        });    
        
        state.calendarioDiasFestivos.valoresCCCalendarioDiasFestivosList = eventosAuxiliar;

        dispatch("diasFestivosData/guardarCalendario", state.calendarioDiasFestivos, { root: true });
    },
    eliminarCalendario({ commit, dispatch }) {
        dispatch("diasFestivosData/eliminarCalendario", state.calendarioDiasFestivos.id, { root: true });
        commit('mutateCalendarioDiasFestivos', null)
    },
    actualizarProps({ commit }, { propiedad, valor }) {
        commit('mutateProps', { propiedad, valor });
    },

    resetStore({ commit }) {
        commit("resetStore")
    },

    //menu-card-event
    createTempleateEvent({ state }, date) {
        let diaFestivo = new DiaFestivo();
        diaFestivo.start = date;
        diaFestivo.fechaFestiva = date;
        state.diaFestivo = diaFestivo;
    },

    saveEvent({ state, commit }) {
        state.calendarioDiasFestivos.events.push(state.diaFestivo);
        commit('mutateMenuEdit', false);
        commit('mutateDiaFestivo', new DiaFestivo());
    },

    deleteEvent({ state, commit }, item) {
        let idDelete = item.id;
        let events = state.calendarioDiasFestivos.events;
        events = events.filter(event => event.id !== idDelete);
        state.calendarioDiasFestivos.events = events;

        commit('mutateMenuEdit', false);
        commit('mutateDiaFestivo', new DiaFestivo());
    },

    cancelEditEvent({ state,commit }) {
        let diaFestivoStored = new DiaFestivo(state.diaFestivoEdit);
        let events = state.calendarioDiasFestivos.events;
        //Encontrar el index del evento editado
        let index = events.findIndex(event => event.id === diaFestivoStored.id);
        //Remover el index en events y agregar el evento editado
        events.splice(index, 1);
        events.push(diaFestivoStored);
        state.calendarioDiasFestivos.events = events;
        commit('mutateMenuEdit', false);
        commit('mutateDiaFestivo', new DiaFestivo());
        commit('mutateDiaFestivoEdit', new DiaFestivo());
    }
}

const mutations = {
    mutateEsCopiar(state, value) {
        state.esCopiar = value;
    },
    mutateVerFormAgregarCalendario(state, value) {
        state.verFormAgregarCalendario = value;
    },
    mutateItemPaisSeleccionado(state, value) {
        state.itemPaisSeleccionado = value;
    },
    mutateEvents(state, value) {
        state.eventos = value;
    },
    mutateCalendarioDiasFestivos(state, value) {
        state.calendarioDiasFestivos = new CalendarioDiasFestivos(value);
    },
    mutateCalendarios(state, value) {
        state.calendarios = value;
    },
    mutateProps(state, { propiedad, valor }) {
        if (propiedad.includes(".")) {
            let propiedadesInternas = propiedad.split(".");
            let objetoAux = state.calendarioDiasFestivos;

            if (propiedadesInternas.length > 0) {
                for (let i = 0; i < propiedadesInternas.length - 1; i++) {
                    const propiedadAux = propiedadesInternas[i];

                    if (Object.hasOwnProperty.call(objetoAux, propiedadAux)) {
                        objetoAux = objetoAux[propiedadAux];
                    }
                }

                objetoAux[propiedadesInternas[propiedadesInternas.length - 1]] = valor;
            } else {
                if (Object.hasOwnProperty.call(objetoAux, propiedad)) {
                    objetoAux[propiedad] = valor;
                }
            }
        } else {
            state.calendarioDiasFestivos[propiedad] = valor;
        }
    },
    mutateLoadingEnviarDatos(state, value) {
        state.loadingEnviarDatos = value;
    },
    mutateLoadingObtenerDatos(state, value) {
        state.loadingObtenerDatos = value;
    },
    resetStore(state) {
        state.calendarioDiasFestivos = new CalendarioDiasFestivos();
        state.verFormAgregarCalendario = false;
        state.eventos = [];
        state.itemPaisSeleccionado = {};
        state.esCopiar = false;
        state.loadingObtenerDatos = false;
        state.loadingEnviarDatos = false;
        state.calendarios = [];
        state.indexCalendario = -1;
    },
    mutateIndexCalendario(state, value) {
        state.indexCalendario = value;
    },
    //menu-card-event
    mutateMenuEdit(state, value) {
        state.menuEdit = value;
    },
    mutateDiaFestivo(state, value) {
        state.diaFestivo = value;
        /* state.diaFestivo = new DiaFestivo(value); */
    },
    mutateDiaFestivoEdit(state, value) {
        state.diaFestivoEdit = new DiaFestivo(value);
    }
}

const getters = {
    getEsCopiar() {
        return state.esCopiar;
    },
    getVerFormAgregarCalendario() {
        return state.verFormAgregarCalendario;
    },
    getItemPaisSeleccionado() {
        return state.itemPaisSeleccionado;
    },
    getEvents() {
        return state.eventos;
    },
    getCalendarios() {
        return state.calendarios;
    },
    getCalendarioDiasFestivos() {
        return state.calendarioDiasFestivos;
    },

    getLoadingObtenerDatos() {
        return state.loadingObtenerDatos;
    },
    getLoadingEnviarDatos() {
        return state.loadingEnviarDatos;
    },

    getIndexCalendario() {
        return state.indexCalendario;
    },
}

export const diasFestivosController = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}