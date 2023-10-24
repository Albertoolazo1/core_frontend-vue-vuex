<template>
  <v-menu
    v-if="type == 'menu'"
    ref="menu"
    v-model="menu"
    transition="scale-transition"
    offset-y
    min-width="auto"
    :close-on-content-click="false"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <w-text-field
        v-bind="attrs"
        v-on="on"
        v-model="fecha"
        readonly
        prepend-inner-icon="mdi-calendar-range"
        :label="label"
        :rules="rules"
        :disabled="disabled"
      />
    </template>
    <v-date-picker
      v-if="esRango"
      v-model="rango"
      :max="max"
      :min="min"
      @change="save"
      range
    ></v-date-picker>
    <v-date-picker
      v-else
      v-model="fecha"
      :max="max"
      :min="min"
      @change="save"
    ></v-date-picker>
  </v-menu>

  <v-row v-else dense class="mt-n9">
    <v-col cols="12">
      <span class="text-caption font-weight-bold">{{ label + ":" }}</span>
    </v-col>
    <v-col cols="4">
      <v-select
        v-model="anio"
        dense
        outlined
        required
        :items="anios"
        label="Año:"
        :rules="[rulesActive.required]"
      />
    </v-col>
    <v-col cols="4">
      <v-select
        v-model="mes"
        dense
        outlined
        required
        :items="meses"
        label="Mes:"
        :rules="[rulesActive.required]"
      />
    </v-col>
    <v-col cols="4">
      <v-select
        v-model="dia"
        dense
        outlined
        required
        :items="dias"
        label="Día:"
        :rules="[rulesActive.required]"
        :disabled="dias.length == 0"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Object],
      default: "1900-01-01",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Fecha",
    },
    rules: {
      type: [Object, Array],
    },
    max: {
      type: String,
      default: "3000-01-01",
    },
    min: {
      type: String,
      default: "1950-01-01",
    },
    type: {
      type: String,
      default: "menu",
    },
    esRango: {
      type: Boolean,
      default: false,
    },
    position: {
      type: [String, Number],
      default: 0,
    },
    fechaRango: {
      type: String,
      default: "",
    },
  },

  mounted: function () {
    let d = new Date();
    let yy = d.getFullYear();
    let aniosAux = [];

    for (let index = 0; index <= 90; index++) {
      let anioAux = yy - index;
      aniosAux.push(String(anioAux));
    }

    this.anios = aniosAux;

    if (this.fecha && this.fecha != "" && this.fecha != null) {
      let fecha = this.fecha.substring(0, 10);
      let fechaArrayAux = fecha.split("-");

      this.anio = fechaArrayAux[0];
      this.mes = fechaArrayAux[1];
      this.dia = fechaArrayAux[2];
    }
  },

  data: () => {
    return {
      activePicker: null,
      menu: false,
      dia: "",
      mes: "",
      anio: "",
      dias: [],
      rulesActive: {
        required: (v) => !!v || "Este campo es requerido.",
      },
      anios: [],
      meses: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      rango: [],
    };
  },

  computed: {
    fecha: {
      get: function () {
        return String(this.value && this.value != null ? this.value : "");
      },
      set: function (newValue) {
        this.$emit(
          "input",
          String(newValue && newValue != null ? newValue : "")
        );
      },
    },
    validarReglas() {
      return this.rules[0]();
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
  },

  watch: {
    anio(valorAnio) {
      if (valorAnio != "" && this.mes != "") {
        this.dias = [];

        let ultimoDia = new Date(valorAnio, this.mes, 0).getDate();

        for (let index = 1; index <= ultimoDia; index++) {
          let dia = index;
          if (dia < 10) {
            dia = "0" + dia;
          }

          this.dias.push(String(dia));
        }
      }

      if (this.dia != "" && this.mes != "" && this.anio != "") {
        this.fecha = this.anio + "-" + this.mes + "-" + this.dia;
      }
    },
    mes(valorMes) {
      if (valorMes != "" && this.anio != "") {
        this.dias = [];

        let ultimoDia = new Date(this.anio, valorMes, 0).getDate();

        for (let index = 1; index <= ultimoDia; index++) {
          let dia = index;
          if (dia < 10) {
            dia = "0" + dia;
          }

          this.dias.push(String(dia));
        }
      }

      if (this.dia != "" && this.mes != "" && this.anio != "") {
        this.fecha = this.anio + "-" + this.mes + "-" + this.dia;
      }
    },
    dia(valorDia) {
      if (valorDia != "") {
        this.fecha = this.anio + "-" + this.mes + "-" + valorDia;
      }
    },

    value(nuevoValor) {
      if (nuevoValor && nuevoValor != "") {
        let fecha = nuevoValor.substring(0, 10);
        let fechaArrayAux = fecha.split("-");

        this.anio = fechaArrayAux[0];
        this.mes = fechaArrayAux[1];
        this.dia = fechaArrayAux[2];
      } else {
        this.anio = "";
        this.mes = "";
        this.dia = "";
      }
    },
    fecha(newVal) {
      if (this.position == 0) {
        this.rango[this.position] = newVal;
        this.rango[1] = this.fechaRango;
      } else {
        this.rango[0] = this.fechaRango;
        this.rango[this.position] = newVal;
      }
    },
    fechaRango(newVal) {
      if (this.position == 0) {
        this.rango[this.position] = this.fecha;
        this.rango[1] = newVal;
      } else {
        this.rango[0] = newVal;
        this.rango[this.position] = this.fecha;
      }
    },
    rango(newVal) {
      if (this.position == 0) {
        this.fecha = newVal[0];
        newVal[1] = this.fechaRango;
      } else {
        this.fecha = newVal[0];
        newVal[0] = this.fechaRango;
        newVal[1] = this.fecha;
      }
    },
  },
};
</script>
