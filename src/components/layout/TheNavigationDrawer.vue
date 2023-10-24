<template>
  <v-navigation-drawer
    v-if="isLogged"
    app
    v-model="navigationDrawerStatus"
    permanent
    expand-on-hover
    :mini-variant.sync="mini"
  >
    <v-list nav dense class="mb-0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-img
              height="30"
              contain
              src="@/assets/logo.png"
              alt="logo"
            ></v-img>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-3"></v-divider>

    <v-list
      v-for="(item, key, i) in items"
      :key="i"
      flat
      dense
      nav
      class="pb-0 mb-0 pt-0 mt-0"
    >
      <v-list-item
        v-if="!item.children"
        color="white"
        :to="item.href"
        active-class="primary"
        @click="setMenuActive(item, true)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title> {{ item.name }}</v-list-item-title>
      </v-list-item>

      <v-list-group
        v-else
        :prepend-icon="item.icon"
        no-action
        :active-class="
          item.esActivo ? 'secondary--text' : 'grey--text text--darken-1'
        "
      >
        <template v-slot:activator>
          <v-list-item-title> {{ item.name }} </v-list-item-title>
        </template>
        <v-treeview :items="item.children" open-on-click>
          <template v-slot:apend v-if="0 != 0"></template>
          <template v-slot:label="{ item }">
            <v-list-item
              dense
              :to="item.href"
              @click="setMenuActive(key, true)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-treeview>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { config } from "../../_config";
import { mapGetters, mapActions, mapState } from "vuex";
import { appStorage, rutaAutorizada } from "../../_helpers";

export default {
  components: {},
  name: "NavigationDrawer",

  created() {
    if (this.items.length === 0) {
      this.items = this.procesarItemsNavbar();
    }
  },

  mounted() {
    let isMenuActive = appStorage.getMenuActive();

    if (isMenuActive && isMenuActive != "undefined") {
      this.opcionActivaMenu = isMenuActive;
    }
    this.getUsername();

    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", this.onResize, { passive: true });
  },

  data() {
    return {
      username: "Usuario",
      userInitials: "AA",
      mini: true,

      items: [],

      catalogos: [
        {
          id: 81,
          name: "Tipos de Bienes",
          href: { name: "tiposBienes" },
        },
        {
          id: 82,
          name: "Estados Civiles",
          href: { name: "estadosCiviles" },
        },
      ],
    };
  },

  computed: {
    ...mapState({ app: "app" }),

    ...mapGetters({
      isLogged: "loginController/getStatusLogin",
      user: "loginController/getUser",
      token: "loginController/getToken",

      getMenuType: "app/getMenuType",
    }),

    opcionActivaMenu: {
      get() {
        return this.app.opcionActivaMenu;
      },
      set() {},
    },

    navigationDrawerStatus: {
      get() {
        return this.app.navigationDrawerStatus;
      },
      set(newVal) {
        this.toggleNavigationStatus(newVal);
      },
    },
  },

  methods: {
    ...mapActions({
      toggleNavigationStatus: "app/toggleNavigationStatus",
      updateOpcionActivaMenu: "app/updateOpcionActivaMenu",
    }),

    getUsername(user) {
      if (user != undefined && user.nombre != undefined) {
        this.username = user.nombre;
        this.userInitials = user.nombre[0] + user.apellidoPaterno[0];
      } else {
        let storageUser = appStorage.getUser();
        if (storageUser != undefined && storageUser != "") {
          this.username = storageUser.nombre;
          this.userInitials =
            storageUser.nombre[0] + storageUser.apellidoPaterno[0];
        }
      }
    },

    handleAddSuggestion(item) {
      if (item.path) {
        this.opcionActivaMenu = item.path;
      }
    },

    procesarItemsNavbar() {
      let itemsNav = config.MENU_ITEMS;
      let itemsNavAux = [];

      itemsNav.forEach((itemNav) => {
        if (itemNav.children) {
          let arrayAuxA = [];
          itemNav.children.forEach((childrenA) => {
            if (childrenA.children) {
              let arrayAuxB = [];
              childrenA.children.forEach((childrenB) => {
                if (childrenB.children) {
                  let arrayAuxC = [];
                  childrenB.children.forEach((childrenC) => {
                    if (childrenC.children) {
                      let arrayAuxD = [];
                      childrenC.children.forEach((childrenD) => {
                        if (rutaAutorizada(childrenD)) {
                          arrayAuxD.push(childrenD);
                        }
                      });

                      if (arrayAuxD.length > 0) {
                        childrenC.children = arrayAuxD.slice();
                        arrayAuxC.push(childrenC);
                      }
                    } else {
                      if (rutaAutorizada(childrenC)) {
                        arrayAuxC.push(childrenC);
                      }
                    }
                  });

                  if (arrayAuxC.length > 0) {
                    childrenB.children = arrayAuxC.slice();
                    arrayAuxB.push(childrenB);
                  }
                } else {
                  if (rutaAutorizada(childrenB)) {
                    arrayAuxB.push(childrenB);
                  }
                }
              });

              if (arrayAuxB.length > 0) {
                childrenA.children = arrayAuxB.slice();
                arrayAuxA.push(childrenA);
              }
            } else {
              if (rutaAutorizada(childrenA)) {
                arrayAuxA.push(childrenA);
              }
            }
          });
          if (arrayAuxA.length > 0) {
            itemNav.children = arrayAuxA.slice();
            itemsNavAux.push(itemNav);
          }
        } else {
          if (rutaAutorizada(itemNav)) {
            itemsNavAux.push(itemNav);
          }
        }
      });

      return itemsNavAux.slice();
    },

    onResize() {},

    setMenuActive(item, estatus) {
      this.items.forEach((element) => {
        if (element == item || element.id == item) {
          element.esActivo = estatus;
        } else {
          element.esActivo = false;
        }
      });
    },
  },

  watch: {
    user: function (user) {
      if (user != undefined) {
        this.items = this.procesarItemsNavbar();
        this.getUsername(user);
      }
    },
  },
};
</script>

<style>
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 7px;
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
  background: transparent;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 20px;
  border: 1px solid grey;
}
</style>
