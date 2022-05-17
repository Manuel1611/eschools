<template>
  <q-page>
    <h3>Añadir Matricula</h3>
    <h4>Acepta el dolor, pero no aceptes que lo mereces</h4>

    <div class="form-container">
      <div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Usuario</label>
              <select required v-model="matricula.usuario" name="usuario">
                <option value="" selected disabled></option>
                <option
                  v-for="(item, index) in students"
                  :key="index"
                  :value="item[0]"
                >
                  {{
                    item[1].nombre +
                    " " +
                    item[1].apellidos +
                    " - " +
                    item[1].email
                  }}
                </option>
              </select>
            </div>
            <div>
              <label for="">Curso</label>
              <select required v-model="matricula.curso" name="curso">
                <option value="" selected disabled></option>
                <option
                  v-for="(item, index) in courses"
                  :key="index"
                  :value="item[0]"
                >
                  {{ item[1].nombre }}
                </option>
              </select>
            </div>

            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Matricular alumno"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="no-form-container">
      <p>E-Schools</p>
    </div>

    <div @click="goBack">Volver</div>
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
    };
  },
  setup() {
    const $q = useQuasar();
    return {};
  },
  methods: {
    goBack() {
      this.$router.push("/admin/matricula");
    },

    submitForm() {
      console.log("kek");
      if (this.matricula.usuario != "" && this.matricula.curso != "") {
        let nombreAlumno = '';
        let nombreCurso = '';
        console.log('matricula usuario: ' + this.matricula.usuario)
        for (let i = 0; i < this.students.length; i++){
          if (this.students[i][0] == this.matricula.usuario){
            console.log('entro en el if')
            console.log(this.students[i][1].nombre)
            nombreAlumno = this.students[i][1].nombre + ' ' + this.students[i][1].apellidos
          }
        }
        for (let i = 0; i < this.courses.length; i++){
          if (this.courses[i][0] == this.matricula.curso){
            nombreCurso = this.courses[i][1].nombre
          }
        }

        let data = {
          idalumno: this.matricula.usuario,
          idcurso: this.matricula.curso,
          nombreAlumno: nombreAlumno,
          nombreCurso: nombreCurso,
        };
        const $q = useQuasar();
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            'x-access-token' : token
          }
        }
        api
          .post("/matricula/store", data, config)
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

      } else {
        console.log("kekwww");
      }

    },

    loadStudents() {
      let cursos;
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get("/user/alumnos", config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            //console.log('conexion correcta2')
            //console.log(response.data)
            //console.log('aaa'+ cursos)
            cursos = response.data.usuarios;

            //console.log('bbb'+ cursos)

            this.students = cursos;
            //console.log(this.cursos)
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
          /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        });
    },

    loadCourses() {
      let cursos;
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get("/curso/index", config)
        .then((response) => {
          console.log("conexion correcta cursos");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            console.log("aaa" + cursos);
            cursos = response.data.cursos;

            console.log("bbb" + cursos);

            this.courses = cursos;
            console.log(this.cursos);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
          /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        });
    },
    checkUserLogged() {
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .post("/auth/checksessiontoken", {}, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 22222");
          } else {
            q.notify({
              color: 'negative',
              position: 'top',
              message: 'Sesión caducada.',
              icon: 'report_problem'
            })
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: e,
            icon: 'report_problem'
          })
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },
  },

  mounted() {
    this.checkUserLogged()
    this.loadCourses();
    this.loadStudents();
  },
});
</script>

<style scoped></style>
