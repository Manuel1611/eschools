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
          <div class="logout-btn-yes" v-close-popup>Aceptar</div>
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

        <q-toolbar-title> E-Schools </q-toolbar-title>
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    //EssentialLink
  },
  data() {
    return {
      openLogoutDialog: false,
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
    };
  },
  methods: {
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

.q-item:hover {
  background-color: #226294;
}

.q-list {
  border: none;
}

.q-item-logout {
  position: absolute;
  bottom: 0;
  width: 100%;
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
}

.logout-btn-yes {
  background-color: #7c7d7c;
}
</style>
