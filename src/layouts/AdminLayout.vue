<template>
  <q-layout view="lHh Lpr lFf">
    <q-dialog
      v-model="openLogoutDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Estás a punto de cerrar sesión</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          ¿Estás seguro?
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div class="logout-btn-yes" v-close-popup @click="logout">
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          E-Schools · Academia Online - &nbsp;<q-icon
            color="white"
            name="fa-solid fa-solar-panel"
          />&nbsp;&nbsp;<span style="font-size: 0.8em"
            >Panel de administrador</span
          >
        </q-toolbar-title>

        <q-icon
          @click="openLogoutDialog = true"
          class="icon-drawer icon-logout"
          color="white"
          name="fa-solid fa-power-off"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      style="background-color: #5f9bc9"
      v-model="leftDrawerOpen"
      show-if-above
    >
      <div class="navega">Menú</div>
      <q-list bordered>
        <q-item clickable v-ripple @click="goUsers">
          <q-item-section avatar>
            <q-icon
              class="icon-drawer"
              color="white"
              name="fa-solid fa-user-graduate"
            />
          </q-item-section>

          <q-item-section class="color-white">Alumnos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goCursos">
          <q-item-section avatar>
            <q-icon class="icon-drawer" color="white" name="fa-solid fa-book" />
          </q-item-section>

          <q-item-section class="color-white">Cursos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goMatricula">
          <q-item-section avatar>
            <q-icon
              class="icon-drawer"
              color="white"
              name="fa-solid fa-pencil"
            />
          </q-item-section>

          <q-item-section class="color-white">Matrículas</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goProfesores">
          <q-item-section avatar>
            <q-icon
              class="icon-drawer"
              color="white"
              name="fa-solid fa-user-tie"
            />
          </q-item-section>

          <q-item-section class="color-white">Profesores</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="leaveAdminArea">
          <q-item-section avatar>
            <q-icon
              class="icon-drawer"
              color="white"
              name="fa-solid fa-arrow-left-long"
            />
          </q-item-section>

          <q-item-section class="color-white"
            >Salir del panel de admin.</q-item-section
          >
        </q-item>

        <q-item class="q-item-user-info" clickable @click="goPerfil">
          <q-item-section avatar>
            <q-icon class="icon-drawer" color="white" name="fa-solid fa-user" />
          </q-item-section>

          <div class="user-info-container">
            <q-item-section class="color-white">{{
              user.nombre
            }}</q-item-section>
            <q-item-section class="color-white">{{
              user.email
            }}</q-item-section>
          </div>
        </q-item>
        <div class="perfil-cerrar-sep"></div>
        <q-item
          class="q-item-logout"
          clickable
          v-ripple
          @click="openLogoutDialog = true"
        >
          <q-item-section avatar>
            <q-icon
              class="icon-drawer"
              color="white"
              name="fa-solid fa-power-off"
            />
          </q-item-section>

          <q-item-section class="color-white">Cerrar sesión</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-footer class="m-footer">
        <div class="btn-footer" @click="openCloseFooter">
          <q-icon
            class="icon-drawer"
            color="white"
            name="fa-solid fa-angle-up"
            id="m-angle"
          />
        </div>
        <div class="footer-inner">
          <div class="footer-inner2">
            <div class="link-footer">Política de Cookies</div>
            <div class="link-footer">Política de Privacidad</div>
          </div>
          <div class="cop">
            {{ new Date().getFullYear() }} © Copyright · E-Schools
          </div>
        </div>
      </q-footer>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";

import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    //EssentialLink
  },
  data() {
    return {
      openLogoutDialog: false,
      user: {
        nombre: "No has iniciado sesión",
        email: "No has iniciado sesión",
      },
      footerdown: true,
    };
  },
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      saveLocalStorage(key, value) {
        $q.localStorage.set(key, value);
      },
    };
  },
  methods: {
    openCloseFooter() {
      var foo = document.getElementsByClassName("m-footer")[0];
      var m_angle = document.getElementById("m-angle");

      if (this.footerdown) {
        foo.style.bottom = "0";
        m_angle.style.transform = "rotate(180deg)";
        this.footerdown = false;
      } else {
        foo.style.bottom = "-60px";
        m_angle.style.transform = "rotate(0deg)";
        this.footerdown = true;
      }
    },
    goPerfil() {
      this.$router.push("/perfil");
    },
    goUsers() {
      this.$router.push("/admin/users");
    },
    goCursos() {
      this.$router.push("/admin/cursos");
    },
    goMatricula() {
      this.$router.push("/admin/matricula");
    },
    goProfesores() {
      this.$router.push("/admin/profesor");
    },
    leaveAdminArea() {
      this.$router.push("/curso");
    },
    logout() {
      console.log("logout");
      api
        .post("/auth/logout")
        .then((response) => {
          console.log("conexion correcta logout");
          if (response.status == 200) {
            console.log("conexion correcta2 logout");
            console.log(response);
            this.saveLocalStorage("eschoolssessiontoken", "");
            this.$router.push("/auth");
          }
        })
        .catch(() => {
          console.log("error de conexion logout");
          /* q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            }) */
        });
    },
    loadUserData() {
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let data2 = {
        //sessiontoken: token,
      };
      let config = {
        headers: {
          "x-access-token": token,
        },
      };

      api
        .post("/auth/checksessiontoken", data2, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 2");
            console.log(response.data);
            if (response.data.user.rol != "Administrador") {
              this.$router.push("/curso");
            }
            this.user.nombre =
              response.data.user.nombre + " " + response.data.user.apellidos;
            this.user.email = response.data.user.email;
          } else {
            q.notify({
              color: "negative",
              position: "top",
              message: "Sesión caducada.",
              icon: "report_problem",
            });
            this.$router.push("/auth");
          }
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Sesión caducada.",
            icon: "report_problem",
          });
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },
  },
  mounted() {
    this.loadUserData();
    //this.$router.push("/auth");
  },
});
</script>

<style scoped>
.q-toolbar {
  background-color: #1c5785 !important;
}

.navega {
  color: white;
  margin-top: 50px;
  font-size: 2em;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 60px;
  position: relative;
}

.navega::before {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
}

.color-white {
  color: white;
  font-size: 1.2em;
}

.icon-drawer {
  margin: 15px 0;
  font-size: 1.3em;
}

.q-item {
  transition: 0.1s ease;
}

.q-item:not(:last-child):hover {
  background-color: #226294;
}

.q-list {
  border: none;
}

.q-item-logout {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #2c6591;
}

.q-item-user-info {
  position: absolute;
  bottom: 67px;
  width: 100%;
  background-color: #2c6591;
}

.q-item-user-info:hover {
  background-color: #5f9bc9 !important;
}

.q-item-logout:hover {
  background-color: #5f9bc9;
}

.top-logout {
  position: absolute;
  bottom: 128px;
  width: 100%;
  height: 20px;
  left: 0;
  background-color: #407ba8;
}

.top-logout-two {
  position: absolute;
  bottom: 148px;
  width: 100%;
  height: 20px;
  left: 0;
  background-color: #4f8ab8;
}

.icon-logout {
  cursor: pointer;
  margin-right: 10px;
}

.background-myblue {
  background-color: #226294;
}

.logoutModal-margins {
  margin: 20px 0;
  border-radius: 0 !important;
  padding: 0;
}

.logout-btn-no,
.logout-btn-yes {
  margin: 0 !important;
  width: 100px;
  text-align: center;
  color: white;
  cursor: pointer;
  padding: 10px 0;
  font-size: 1.1em;
}

.logout-btn-no {
  background-color: #d42c2c;
  transition: 0.2s ease;
}

.logout-btn-yes {
  background-color: #21ba45;
  transition: 0.2s ease;
}

.logout-btn-no:hover {
  background-color: #f24141;
}

.logout-btn-yes:hover {
  background-color: #30c954;
}

.user-info-container {
  display: flex;
  flex-direction: column;
}

.user-info-container div {
  margin: 0;
  padding: 0;
}

.user-info-container div:not(:first-of-type) {
  font-size: 0.9em;
}

.perfil-cerrar-sep {
  height: 3px;
  background-color: #acadad;
  position: absolute;
  bottom: 64px;
  width: 100%;
}

.m-footer {
  position: fixed;
  height: 60px;
  bottom: -60px;
  background-color: #cfcfcf;
  box-shadow: 0 0 2px rgba(1, 1, 1, 0.7);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  z-index: 100;
}

.cop {
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

.btn-footer {
  position: absolute;
  width: 40px;
  height: 35px;
  background-color: #787878;
  border-right: 5px solid #cfcfcf;
  border-left: 5px solid #cfcfcf;
  border-top: 5px solid #cfcfcf;
  right: 20px;
  bottom: 60px;
  box-shadow: 10px 0px 6px -3px rgba(1, 1, 1, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

#m-angle {
  transition: all 0.5s ease;
}

.footer-inner {
  display: flex;
  flex-direction: column;
}

.footer-inner2 {
  display: flex;
  margin-bottom: 1px;
  justify-content: space-between;
  width: 300px;
  margin-top: 8px;
}

.link-footer {
  cursor: pointer;
}

.link-footer:hover {
  text-decoration: underline;
}
</style>
