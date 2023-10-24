<template>
  <v-container class="fill-height" fluid>
    <transition
      name="router-anim"
      enter-active-class="router-anim-enter-active"
      leave-active-class="router-anim-leave-active"
    >
      <card-login v-if="stepLogin === 0" />
      <card-form-login v-if="stepLogin === 2" />
      <card-form-sign-in v-if="stepLogin === 3" />

      <card-verificar-correo v-if="stepLogin === 4" />
      <card-verificar-OTP v-if="stepLogin === 5" />
      <card-nueva-password v-if="stepLogin === 6" />
    </transition>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    this.logout();
  },

  computed: {
    ...mapState({
      loginController: "loginController",
    }),

    stepLogin() {
      return this.loginController.stepLogin;
    },
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions({
      logout: "loginController/logout",
    }),
  },

  watch: {},
};
</script>
