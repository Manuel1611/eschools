<template>
  <q-page class="auth-container">
    <h3>Cursos</h3>
    <h4>Honor está muerto, pero veré que puedo hacer</h4>
    <q-list>
      <h3>Lista </h3>
      <q-card flat bordered v-for="(item, index) in cursos" :key="index">
        <q-card-section v-html="item.nombre + ' - '+ item.precio + '€' " />
        <q-card-section v-html="item.descripcion" />

      </q-card>
    </q-list>

    <span>
      <span class="goRegisterClass" @click="goAddCurso">
        Añadir curso
      </span>
    </span>
  </q-page>




</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {

      cursos: {}
    };
  },
  setup() {
    const $q = useQuasar();




    return {

    };
  },
  methods: {


    loadCursos () {
      let cursos
      api.get('/curso/index')
        .then((response) => {
          console.log('conexion correcta')
          if (response.status == 200){
            console.log('conexion correcta2')
            console.log(response.data)
            console.log('aaa'+ cursos)
            cursos = response.data.cursos

            console.log('bbb'+ cursos)

            this.cursos = cursos
            console.log(this.cursos)

          }

        })
        .catch((e) => {
          console.log('error de conexion')
          console.log(e)
           /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        })
    },

    goAddCurso() {
      this.$router.push("/admin/cursos/add");
    },
  },

  mounted(){
    console.log('mounted')
    this.loadCursos()
  }
});
</script>

<style scoped>
</style>
