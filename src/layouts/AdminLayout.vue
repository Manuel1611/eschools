<template>
  <q-layout view="lHh Lpr lFf">
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
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list bordered>
        <q-item clickable v-ripple @click="goUsers">
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>

          <q-item-section>Usuarios</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goCursos">
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>

          <q-item-section>Cursos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goMatricula">
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>

          <q-item-section>Matriculas</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goProfesores">
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>

          <q-item-section>Administrar profesorado</q-item-section>
        </q-item>
      </q-list>
      <div>
        <p>Nombre apellidos</p>
        <p>Email</p>
        <p @click="logout">Cerrar sesión</p>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: 'MainLayout',

  components: {
    //EssentialLink
  },

  setup () {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false)
    return {

      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      saveLocalStorage(key, value){
        $q.localStorage.set(key, value)
      }

    }
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

    logout(){
      console.log('logout')
      api.post('/auth/logout')
        .then((response) => {
          console.log('conexion correcta logout')
          if (response.status == 200){
            console.log('conexion correcta2 logout')
            console.log(response)
            this.saveLocalStorage('eschoolssessiontoken', '')
            this.$router.push("/auth");
          }
        })
        .catch(() => {
          console.log('error de conexion logout')
           /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        })

    }
  },
})
</script>
