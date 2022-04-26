<template>
  <q-page>
    <h3>Añadir Profesor Curso</h3>
    <h4>Acepto que habrá personas a quienes no pueda proteger  </h4>

    <div class="form-container">
      <div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Profesor</label>
              <select required v-model="matricula.usuario" name="usuario">
                <option value="" selected disabled ></option>
                <option v-for="(item, index) in students" :key="index" :value="item[0]">{{ item[1].nombre + ' ' + item[1].apellidos + ' - ' + item[1].email}}</option>
              </select>
            </div>
            <div>
              <label for="">Curso</label>
              <select required v-model="matricula.curso" name="curso" >
                <option value="" selected disabled ></option>
                <option v-for="(item, index) in courses" :key="index" :value="index">{{ item.nombre }}</option>
              </select>
            </div>

            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Añadir profesor"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="no-form-container">
      <p>E-Schools</p>
    </div>

    <div @click="goBack">Volver

    </div>
  </q-page>





</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AdminAddUser",
  data() {
    return {
      matricula: {
        usuario: "",
        curso: "",
      },

      courses: {},
      students: {},

    }
  },
  setup() {
    const $q = useQuasar();
    return {

    }
  },
  methods: {

    goBack(){
      this.$router.push("/admin/profesor");
    },

    submitForm() {
      console.log('kek')
      if (this.matricula.usuario != '' && this.matricula.curso != ''){
        let data = {
          idalumno:  this.matricula.usuario,
          idcurso: this.matricula.curso,
        }

      /*  api.post('/matricula/store', data)
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          console.log(e)
        })

        */
      } else {
        console.log('kekwww')
      }
    },

    loadTeachers () {
      let cursos
      api.get('/user/profesores')
        .then((response) => {
          console.log('conexion correcta')
          if (response.status == 200){
            //console.log('conexion correcta2')
            //console.log(response.data)
            //console.log('aaa'+ cursos)
            cursos = response.data.usuarios

            //console.log('bbb'+ cursos)

            this.students = cursos
            //console.log(this.cursos)

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

    loadCourses () {
      let cursos
      api.get('/curso/index')
        .then((response) => {
          console.log('conexion correcta cursos')
          if (response.status == 200){
            console.log('conexion correcta2')
            console.log(response.data)
            console.log('aaa'+ cursos)
            cursos = response.data.cursos

            console.log('bbb'+ cursos)

            this.courses = cursos
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

  },

  mounted(){
    this.loadCourses()
    this.loadTeachers()
  }
});
</script>

<style scoped>
</style>
