<template>
  <c-basic-card v-show="verFormAgregarCalendario" class="py-0" rounded="lg">
    <v-container fluid>
      <v-row dense>
        <v-col cols="8" offset-md="0">
          <v-card-title class="secondary--text">
            <h4>Gestionar Calendario Días Festivos</h4>
          </v-card-title>
        </v-col>
      </v-row>
      <v-form ref="formAgregarCalendario" lazy-validation>
        <v-row dense class="mt-7">
          <v-col cols="3" offset-md="3">
            <c-select v-model="anio" label="Año" :items="itemsAnios" />
          </v-col>

          <c-select-paises
            v-model="ccPais"
            cols="3"
            object
            :isRequired="true"
          />

          <v-col
            v-if="calendarioExiste"
            cols="12"
            class="text-center mt-n7 mb-7"
          >
            <span class="red--text text-caption">
              Ya existe un calendario con esta configuración, pruebe con otra
              información.
            </span>
          </v-col>

          <c-divider />
        </v-row>
      </v-form>

      <v-row dense>
        <v-col cols="12" offset-md="1" class="mt-2">
          <span class="secondary--text text-h6">
            Gestione los eventos del calendario
          </span>
        </v-col>
      </v-row>
      <!-- Calendario Inrectivo -->
      <template>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                >
                  Hoy
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small> mdi-chevron-left </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right> mdi-menu-down </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="calendarioDiasFestivos.events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="onCreateEvent($event)"
              >
              </v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card color="grey lighten-4" min-width="350px" flat dense>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon v-if="!menuEdit">
                      <v-icon @click="onEditEvent()">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon v-if="menuEdit">
                      <v-icon @click="onSaveEvent()">mdi-content-save</v-icon>
                    </v-btn>
                    <v-btn icon v-if="menuEdit && selectedEvent.name != ''">
                      <v-icon @click="onDeleteEvent()">mdi-trash-can</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text dense class="pb-0">
                    <v-container dense>
                      <template v-if="!menuEdit">
                        <v-row dense class="py-0">
                          <v-col cols="12">
                            <span class="secondary--text font-weight-black"
                              >Evento:
                            </span>
                            <span class="primary--text">
                              {{ selectedEvent.name }}</span
                            >
                          </v-col>
                          <v-col cols="12">
                            <span class="secondary--text font-weight-black"
                              >Fecha:
                            </span>
                            <span class="primary--text">
                              {{ selectedEvent.start }}</span
                            >
                          </v-col>
                          <v-col cols="12">
                            <span class="secondary--text font-weight-black"
                              >Evento:
                            </span>
                            <span class="primary--text">
                              {{
                                getEventSinceColor(selectedEvent.color)
                              }}</span
                            >
                          </v-col>
                        </v-row>
                      </template>
                      <template v-if="menuEdit">
                        <v-row dense>
                          <v-form ref="formEvent" lazy-validation>
                            <v-col cols="12" class="py-0">
                              <c-text-field
                                v-model="selectedEvent.name"
                                :rules="[rules.required]"
                              >
                                <template v-slot:label>
                                  <span>Evento: </span>
                                  <span>
                                    <v-icon x-small color="red" class="pl-1">
                                      mdi-asterisk
                                    </v-icon>
                                  </span>
                                </template>
                              </c-text-field></v-col
                            >
                            <v-col cols="12" class="py-0">
                              <!-- Condición: Solo si esta editando y creando nuevo -->
                              <c-basic-date-input
                                v-model="selectedEvent.start"
                                :disabled="
                                  menuEdit && !selectedEvent.name != ''
                                "
                              >
                                <template v-slot:label>
                                  <span>Fecha: </span>
                                  <span>
                                    <v-icon x-small color="red" class="pl-1">
                                      mdi-asterisk
                                    </v-icon>
                                  </span>
                                </template>
                              </c-basic-date-input>
                            </v-col>
                            <v-col cols="12" class="py-0">
                              <v-select
                                v-model="selectedEvent.color"
                                :rules="[rules.required]"
                                title="Tipo de evento"
                                dense
                                outlined
                                item-text="name"
                                item-value="color"
                                :items="tipoEventos"
                                @change="onChangeTipoEvento()"
                              >
                                <template v-slot:label>
                                  <span>Tipo: </span>
                                  <span>
                                    <v-icon x-small color="red" class="pl-1">
                                      mdi-asterisk
                                    </v-icon>
                                  </span>
                                </template>
                              </v-select></v-col
                            >
                          </v-form>
                        </v-row>
                      </template>
                    </v-container>
                  </v-card-text>
                  <v-card-actions v-if="!menuEdit">
                    <v-row dense>
                      <v-col
                        class="px-0 pt-0"
                        md="4"
                        :offset-md="menuEdit == true ? '8' : '8'"
                      >
                        <v-btn
                          text
                          color="secondary"
                          @click="onCancelEventSimple()"
                        >
                          Cancel
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                  <v-card-actions v-if="menuEdit">
                    <v-row dense>
                      <v-col
                        class="px-0 pt-0"
                        md="4"
                        :offset-md="menuEdit == true ? '8' : '8'"
                      >
                        <v-btn text color="secondary" @click="onCancelEvent()">
                          Cancel
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </template>

      <!-- <form-agregar-evento v-model="valoresCCCalendarioDiasFestivosList" /> -->
    </v-container>

    <v-container fluid>
      <c-divider></c-divider>
      <v-row class="mt-7" dense>
        <c-cancel-button
          cols="2"
          offsetmd="8"
          :loading="loadingEnviarDatos"
          :disabled="loadingEnviarDatos"
          @click="onCancelar"
        ></c-cancel-button>
        <c-confirm-button
          cols="2"
          text="GUARDAR"
          :loading="loadingEnviarDatos"
          :disabled="loadingEnviarDatos"
          @click="onGuardar"
        ></c-confirm-button>
      </v-row>
    </v-container>
  </c-basic-card>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
/* import FormAgregarEvento from "./FormAgregarEvento.vue"; */

export default {
  components: {
    /*  FormAgregarEvento, */
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo requerido.",
      },
      // CALENDAR
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Mes",
        week: "Semana",
        day: "Día",
        "4day": "4 Días",
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      tipoEventos: [
        {
          id: 1,
          name: "Oficina",
          color: "blue",
        },
        {
          id: 2,
          name: "Cultural",
          color: "orange",
        },
        {
          id: 3,
          name: "Nacional",
          color: "green",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      calendarioDiasFestivos:
        "diasFestivosController/getCalendarioDiasFestivos",
      verFormAgregarCalendario:
        "diasFestivosController/getVerFormAgregarCalendario",
      esCopiar: "diasFestivosController/getEsCopiar",
      itemsPaises: "diasFestivosController/getItemsPaises",
      loadingEnviarDatos: "diasFestivosController/getLoadingEnviarDatos",
      calendarios: "diasFestivosController/getCalendarios",
    }),

    ...mapState({
      diasFestivosController: "diasFestivosController",
    }),

    //menu card event
    menuEdit() {
      return this.diasFestivosController.menuEdit;
    },

    diaFestivo() {
      return this.diasFestivosController.diaFestivo;
    },

    itemsAnios() {
      return this.getItemsAnios();
    },

    id() {
      return this.calendarioDiasFestivos.id;
    },
    anio: {
      get() {
        return this.calendarioDiasFestivos.anio;
      },
      set(valor) {
        this.actualizarProps({ propiedad: "anio", valor: valor });
      },
    },
    ccPais: {
      get() {
        return this.calendarioDiasFestivos.ccPais;
      },
      set(valor) {
        this.actualizarProps({ propiedad: "ccPais", valor: valor });
      },
    },
    ccPaisId: {
      get() {
        return this.calendarioDiasFestivos.ccPaisId;
      },
      set(valor) {
        this.actualizarProps({ propiedad: "ccPaisId", valor: valor });
      },
    },
    valoresCCCalendarioDiasFestivosList: {
      get() {
        return this.calendarioDiasFestivos.valoresCCCalendarioDiasFestivosList;
      },
      set(valor) {
        this.actualizarProps({
          propiedad: "valoresCCCalendarioDiasFestivosList",
          valor: valor,
        });
      },
    },
    calendarioExiste() {
      let idActual = this.id;
      let anioActual = this.anio;
      let ccPaisIdActual = this.ccPais.id;
      return this.validateCalendarioExiste(
        idActual,
        anioActual,
        ccPaisIdActual
      );
    },
  },
  methods: {
    ...mapActions({
      toggleVerFormAgregarCalendario:
        "diasFestivosController/toggleVerFormAgregarCalendario",
      actualizarProps: "diasFestivosController/actualizarProps",
      guardarCalendario: "diasFestivosController/guardarCalendario",
      showAppMessage: "app/showAppMessage",
      seleccionarCalendarioDiasFestivos:
        "diasFestivosController/seleccionarCalendarioDiasFestivos",
      createTempleateEvent: "diasFestivosController/createTempleateEvent",
      saveEvent: "diasFestivosController/saveEvent",
      deleteEvent: "diasFestivosController/deleteEvent",
      cancelEditEvent: "diasFestivosController/cancelEditEvent",
    }),

    ...mapMutations({
      mutateMenuEdit: "diasFestivosController/mutateMenuEdit",
      mutateDiaFestivoEdit: "diasFestivosController/mutateDiaFestivoEdit",
    }),

    onEditEvent() {
      this.mutateDiaFestivoEdit(this.selectedEvent);
      if (this.menuEdit) {
        //Guardar evento por si es cancelado en medio de edición.
        const formSaveEventValidate = this.$refs.formEvent.validate();
        if (formSaveEventValidate) {
          this.mutateMenuEdit(false);
        } else {
          this.showAppMessage({
            type: "error",
            text: "Faltan campos presentes para el evento.",
          });
        }
      } else {
        this.mutateMenuEdit(true);
      }
    },

    onSaveEvent() {
      const formSaveEventValidate = this.$refs.formEvent.validate();
      this.mutateDiaFestivoEdit({});

      if (formSaveEventValidate) {
        //TODO: guardar evento, falta este método, o que actualiza.
        this.mutateMenuEdit(false);
        this.saveEvent();
      } else {
        this.showAppMessage({
          type: "error",
          text: "Faltan campos presentes para el evento.",
        });
      }
    },

    onCancelEventSimple() {
      this.selectedOpen = false;
      this.mutateMenuEdit(false);
    },

    onCancelEvent() {
      this.selectedOpen = false;
      //TODO: Añadir método que regresa el evento a su estado original.
      this.cancelEditEvent();
    },

    onDeleteEvent() {
      //TODO: Añadir método que elimina el evento.
      this.deleteEvent(this.selectedEvent);
      this.selectedOpen = false;
      this.mutateMenuEdit(false);
    },

    onCreateEvent($event) {
      this.createTempleateEvent(this.focus);
      let diaFestivoAux = this.diaFestivo;
      this.showEvent({
        nativeEvent: $event.nativeEvent,
        event: diaFestivoAux,
      });
      this.mutateMenuEdit(true);
    },

    onChangeTipoEvento() {
      let color = this.selectedEvent.color;
      this.selectedEvent.color = color;
    },

    //Método que reconoce el evento seleccionado conforme al color
    getEventSinceColor(color) {
      switch (color) {
        case "blue":
          return "Oficina";
        case "orange":
          return "Cultural";
        case "green":
          return "Nacional";
      }
    },

    getItemsAnios() {
      const anioActual = new Date().getFullYear();
      let itemsAux = [String(anioActual)];

      for (let i = 0; i < 10; i++) {
        const anioAux = anioActual + i;

        itemsAux.push(String(anioAux));
      }

      return itemsAux;
    },
    onGuardar() {
      const formValido = this.$refs.formAgregarCalendario.validate();

      if (!this.calendarioExiste) {
        if (formValido) {
          this.guardarCalendario();
        } else {
          this.showAppMessage({
            type: "error",
            text: "Faltan campos necesarios.",
          });
        }
      } else {
        this.showAppMessage({
          type: "error",
          text: "Ya existe un calendario con esta configuración.",
        });
      }
    },
    onCancelar() {
      this.seleccionarCalendarioDiasFestivos(null);
      this.toggleVerFormAgregarCalendario(false);
    },
    validateCalendarioExiste(idActual, anioActual, ccPaisIdActual) {
      if (this.calendarios.length > 0) {
        let buscarCalendario = this.calendarios.filter((calendario) => {
          let anioAux = calendario.anio;
          let ccPaisIdAux = calendario.ccPaisId;
          let idAux = calendario.id;

          if (idAux != idActual) {
            if (anioActual === anioAux && ccPaisIdActual === ccPaisIdAux) {
              return calendario;
            }
          }
        });

        if (buscarCalendario.length > 0) {
          return true;
        }
      }

      return false;
    },

    // CALENDAR
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      /* Asignar en false edición por si es el caso que se quedo del otro lado */
      this.mutateMenuEdit(false);
      /* Selected event */
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
};
</script>

<style>
</style>