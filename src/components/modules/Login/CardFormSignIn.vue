<template>
  <v-row align="center" justify="center" dense>
    <v-col cols="12" md="4" offset-md="1">
      <w-card elevation="0">
        <v-img class="mb-7" :src="imgLogo" height="10vh" contain> </v-img>

        <v-card-title>
          <h3 class="mb-7 font-weight-bold" style="white-space: nowrap">
            Registro
          </h3>
        </v-card-title>

        <v-card-text>
          <v-form
            v-show="step === 1"
            ref="formPersonal"
            v-model="valid"
            lazy-validation
            @submit.prevent="handleLogin"
          >
            <v-container>
              <v-row dense>
                <v-col cols="12" md="12">
                  <w-text-field
                    v-model="nombre"
                    class="rounded-lg"
                    label="Nombre"
                    placeholder="Nombre"
                    :rules="[rules.requiredInput]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <w-text-field
                    v-model="apellidoPaterno"
                    class="rounded-lg"
                    label="Apellido Paterno"
                    placeholder="Apellido Paterno"
                    :rules="[rules.requiredInput]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <w-text-field
                    v-model="apellidoMaterno"
                    class="rounded-lg"
                    label="Apellido Materno"
                    placeholder="Apellido Materno"
                    :rules="[rules.requiredInput]"
                  />
                </v-col>

                <c-button-confirm
                  cols="12"
                  text="Continuar"
                  block
                  icon="mdi-arrow-right"
                  @click="step = 2"
                />

                <c-button-cancel
                  cols="12"
                  block
                  rounded
                  icon="mdi-arrow-left"
                  iconalign="left"
                  text="VOLVER"
                  :disabled="loadingSignup"
                  @click="handleNextStep(0)"
                />
              </v-row>
            </v-container>
          </v-form>

          <v-form
            v-show="step === 2"
            ref="formDatos"
            v-model="valid"
            lazy-validation
            @submit.prevent="handleLogin"
          >
            <v-container>
              <v-row dense>
                <v-col cols="12" md="12">
                  <w-text-field
                    v-model="username"
                    class="rounded-lg"
                    label="Correo Electrónico"
                    placeholder="Correo Electrónico"
                    :rules="[rules.requiredInput, rules.email]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <w-text-field
                    v-model="password"
                    class="rounded-lg"
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    :rules="[rules.requiredInput]"
                    :type="showPass ? 'text' : 'password'"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <w-text-field
                    v-model="passwordConfirm"
                    class="rounded-lg"
                    label="Confirmar Contraseña"
                    placeholder="Confirmar contraseña"
                    :rules="[rules.requiredInput, rules.validatePassword]"
                    :type="showPassConfirmar ? 'text' : 'password'"
                    :append-icon="showPassConfirmar ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassConfirmar = !showPassConfirmar"
                  />
                </v-col>

                <c-button-confirm
                  cols="12"
                  text="Iniciar Sesión"
                  block
                  icon="mdi-arrow-right"
                  :loading="loadingSignup"
                  :disabled="!valid || loadingSignup"
                  @click="handleSignup"
                />

                <c-button-cancel
                  cols="12"
                  block
                  rounded
                  icon="mdi-arrow-left"
                  iconalign="left"
                  text="Atras"
                  :disabled="loadingSignup"
                  @click="step = 1"
                />
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </w-card>
    </v-col>
    <v-col class="image-mobile" cols="12" md="6" offset-md="1">
      <w-card elevation="0">
        <v-img contain height="70vh" :src="imgNoImage"></v-img>
      </w-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImgLogo from "@/assets/logo.png";
import ImgNoImage from "@/assets/no-image.png";

export default {
  data() {
    return {
      imgLogo: ImgLogo,
      imgNoImage: ImgNoImage,
      valid: true,
      showPass: false,
      showPassConfirmar: false,
      passwordConfirm: "",
      rules: {
        requiredInput: (val) =>
          (val || "").length > 0 || "Este campo es requerido.",

        email: (v) => {
          const pattern = /^[\S]+@([\w-]+\.)+[\w-]{2,4}$/;
          return pattern.test(v) || "No cumple con el formato para email.";
        },

        validatePassword: (v) =>
          v === this.password || "Las contraseñas no coinciden.",
      },
      step: 1,
    };
  },

  computed: {
    ...mapState({
      loginController: "loginController",
    }),

    signupRequest() {
      return this.loginController.signupRequest;
    },
    loadingSignup() {
      return this.loginController.loadingSignup;
    },

    nombre: {
      get() {
        return this.signupRequest.nombre;
      },
      set(value) {
        this.actualizarProps({ propiedad: "nombre", valor: value });
      },
    },
    apellidoPaterno: {
      get() {
        return this.signupRequest.apellidoPaterno;
      },
      set(value) {
        this.actualizarProps({ propiedad: "apellidoPaterno", valor: value });
      },
    },
    apellidoMaterno: {
      get() {
        return this.signupRequest.apellidoMaterno;
      },
      set(value) {
        this.actualizarProps({ propiedad: "apellidoMaterno", valor: value });
      },
    },
    username: {
      get() {
        return this.signupRequest.username;
      },
      set(value) {
        this.actualizarProps({ propiedad: "username", valor: value });
      },
    },
    correoElectronico: {
      get() {
        return this.signupRequest.correoElectronico;
      },
      set(value) {
        this.actualizarProps({ propiedad: "correoElectronico", valor: value });
      },
    },
    password: {
      get() {
        return this.signupRequest.password;
      },
      set(value) {
        this.actualizarProps({ propiedad: "password", valor: value });
      },
    },
  },

  methods: {
    ...mapActions({
      actualizarProps: "loginController/actualizarPropsSignup",
      signup: "loginController/signUp",
      updateLoginStep: "loginController/updateLoginStep",
    }),

    handleNextStep(step) {
      this.updateLoginStep({ step, destino: 0 });
    },

    handleSignup() {
      const formDatosValido = this.$refs.formDatos.validate();
      const formPersonalValido = this.$refs.formPersonal.validate();

      if (formDatosValido && formPersonalValido) {
        this.signup();
      }
    },
  },

  watch: {
    username(newVal) {
      this.correoElectronico = newVal;
    },
  },
};
</script>

<style>
</style>