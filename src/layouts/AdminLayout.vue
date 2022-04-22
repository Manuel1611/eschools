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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'MainLayout',

  components: {
    //EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    return {

      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

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
  },
})
</script>
