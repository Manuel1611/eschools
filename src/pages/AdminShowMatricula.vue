<template>
  <q-page class="auth-container">
    <h3>Show Matriculas</h3>
    <div>
      <select
        required
        v-model="this.matricula.idalumno"
        name="idalumno"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      >
        <option v-for="(item, index) in students" :key="index" :value="item[0]">
          {{ item[1].nombre + " " + item[1].apellidos + " - " + item[1].email }}
        </option>
      </select>
    </div>
    <div>
      <select
        required
        v-model="this.matricula.idcurso"
        name="idcurso"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      >
        <option v-for="(item, index) in courses" :key="index" :value="index">
          {{ item.nombre }}
        </option>
      </select>
    </div>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.matricula.fechainicio"
        :disabled="this.isDisabled"
      />
    </div>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.matricula.fechafin"
        :disabled="this.isDisabled"
      />
    </div>
    <div class="btns-container">
      <span class="volverbtn display-block" @click="goBack">Volver</span>
      <br /><br />
      <span
        :class="!this.show ? 'editbtn display-none' : 'editbtn display-block'"
        @click="changeEditStyles"
        >Editar</span
      >
      <span
        :class="
          this.show ? 'cancelbtn display-none' : 'cancelbtn display-block'
        "
        @click="cancelEdit"
        >Cancelar</span
      >
      <span
        :class="this.show ? 'savebtn display-none' : 'savebtn display-block'"
        @click="updateMatricula"
        >Guardar</span
      >
    </div>
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
      id: "",
      matricula: {},
      show: true,
      isDisabled: true,

      courses: {},
      students: {},
      defaultValues: {
        idalumno: "",
        idcurso: "",
        fechafin: "",
        fechainicio: "",
      },
    };
  },
  methods: {
    changeEditStyles() {
      console.log(this.matricula.idalumno);
      this.defaultValues.idalumno = this.matricula.idalumno;
      this.defaultValues.idcurso = this.matricula.idcurso;
      this.defaultValues.fechafin = this.matricula.fechafin;
      this.defaultValues.fechainicio = this.matricula.fechainicio;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    cancelEdit() {
      this.matricula.idalumno = this.defaultValues.idalumno;
      this.matricula.idcurso = this.defaultValues.idcurso;
      this.matricula.fechafin = this.defaultValues.fechafin;
      this.matricula.fechainicio = this.defaultValues.fechainicio;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    updateMatricula() {
      let data = {
        idalumno: this.matricula.idalumno,
        idcurso: this.matricula.idcurso,
        activa: this.matricula.activa,
        fechafin: this.matricula.fechafin,
        fechainicio: this.matricula.fechainicio,
      };
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .put("/matricula/" + this.id, data, config)
        .then((response) => {
          console.log("edit OK");
          this.show = !this.show;
          this.isDisabled = !this.isDisabled;
        })
        .catch(() => {
          console.log("edit MAL");
        });
    },
    loadmatricula() {
      let matriculas;
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get("/matricula/" + this.id, config)
        .then((response) => {
          //console.log("conexion correcta");
          if (response.status == 200) {
            //console.log("conexion correcta2");
            console.log(response.data);
            matriculas = response.data.matricula;
            this.matricula = matriculas;
            //console.log(this.matricula);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    loadStudents() {
      let students;
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
            console.log(response.data);
            //console.log("aaa" + students);
            students = response.data.usuarios;

            //console.log("bbb" + students);

            this.students = students;
            //console.log(this.students)
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
            //console.log("conexion correcta2");
            console.log(response.data);
            //console.log("aaa" + cursos);
            cursos = response.data.cursos;

            //console.log("bbb" + cursos);

            this.courses = cursos;
            //console.log(this.cursos);
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

    goBack() {
      this.$router.push("/admin/matricula/");
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
    this.id = this.$router.currentRoute._value.params.id;
    this.loadmatricula();
    this.loadCourses();
    this.loadStudents();
  },
});
</script>

<style scoped>
.btns-container {
  margin-top: 10px;
}
.volverbtn {
  background-color: #1c5785;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
}

.editbtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
}

.cancelbtn {
  background-color: red;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
}

.savebtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
}

.display-none {
  display: none;
}

.display-block {
  display: inline;
}

input {
  margin: 10px;
}

.isShow {
  matricular: default !important;
  background-color: transparent;
  border: none;
  outline: none;
  opacity: 1 !important;
  border: 2px solid transparent;
}

.isEdit {
  background-color: transparent;
  border: 2px solid green;
  outline: none;
  opacity: 1 !important;
}

.isShowSelect {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  border: 0;
  border: 2px solid transparent;
  margin: 10px;
  matricular: default !important;
  opacity: 1 !important;
  outline: none;
}

.isEditSelect {
  margin: 10px;
  border: 2px solid green;
  outline: none;
}
</style>
