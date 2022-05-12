<template>
  <q-page class="auth-container">
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Matrículas en E-Schools</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Cambia a los usuarios de E-Schools de cursos</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div class="form-container">
      <div>
        <label for="idalumno">Alumno</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <select
            required
            v-model="this.matricula.idalumno"
            name="idalumno"
            :class="this.show ? 'isShowSelect' : 'isEditSelect'"
            :disabled="this.isDisabled"
          >
            <option
              v-for="(item, index) in students"
              :key="index"
              :value="item[0]"
            >
              {{
                item[1].nombre + " " + item[1].apellidos + " - " + item[1].email
              }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <label for="idcurso">Curso</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <select
            required
            v-model="this.matricula.idcurso"
            name="idcurso"
            :class="this.show ? 'isShowSelect' : 'isEditSelect'"
            :disabled="this.isDisabled"
          >
            <option
              v-for="(item, index) in courses"
              :key="index"
              :value="item[0]"
            >
              {{ item[1].nombre }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <label for="fechainicio">Fecha de inicio</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="fechainicio"
            v-model="this.matricula.fechainicio"
            :disabled="this.isDisabled"
          />
        </div>
      </div>
      <div>
        <label for="fechafin">Fecha de fin</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="fechafin"
            v-model="this.matricula.fechafin"
            :disabled="this.isDisabled"
          />
        </div>
      </div>
      <div class="btns-container">
        <div>
          <input
            :class="
              !this.show
                ? 'btn-register display-none'
                : 'btn-register display-block'
            "
            type="button"
            name="button"
            @click="changeEditStyles"
            value="Editar"
          />
        </div>
        <div style="display: flex">
          <div>
            <input
              :class="
                this.show
                  ? 'btn-register3 display-none'
                  : 'btn-register3 display-block'
              "
              type="button"
              name="button"
              @click="cancelEdit"
              value="Cancelar"
            />
          </div>
          <div>
            <input
              :class="
                this.show
                  ? 'btn-register display-none'
                  : 'btn-register display-block'
              "
              type="button"
              name="button"
              @click="updateMatricula"
              value="Guardar"
            />
          </div>
        </div>
      </div>
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
      api
        .put("/matricula/" + this.id, data)
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
      api
        .get("/matricula/" + this.id)
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
      api
        .get("/user/alumnos")
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
      api
        .get("/curso/index")
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
  },

  mounted() {
    this.id = this.$router.currentRoute._value.params.id;
    this.loadmatricula();
    this.loadCourses();
    this.loadStudents();
  },
});
</script>

<style scoped>
.q-page {
  padding: 20px;
}

.title {
  margin-top: 20px;
  font-size: 1.5em;
  display: flex;
  align-items: center;
}

.icon-drawer {
  margin: 15px 0;
  font-size: 0.9em;
  margin-right: 5px;
}

.top-info {
  background-color: #525252;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.query-found {
  position: absolute;
  left: 0;
  padding-left: 25px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: white;
}

.btn-addnew {
  background-color: #05beed;
  display: inline-block;
  padding: 10px 20px;
  color: black;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
}

.btn-addnew:hover {
  background-color: #12ccfc;
}

.form-container {
  margin-top: 50px;
}

.form-container > div {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 40%;
  min-width: 300px;
  padding: 5px 0;
  outline: none;
  border: 0;
  border-bottom: 2px solid #226294;
}

label::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: #02afdb;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
}

select {
  margin-top: 10px;
  width: 40%;
  min-width: 300px;
  padding: 6px;
  background-color: #dedcdc;
  border: 0;
  outline: none;
  appearance: none;
}

label {
  font-size: 1.1em;
  margin-top: 20px;
  position: relative;
  margin-left: 20px;
}

.btn-register {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
}

.btn-register:hover {
  background-color: #30c954;
}

.btn-register2 {
  background-color: #c92804;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
}

.btn-register2:hover {
  background-color: #d92b04;
}

.btn-register3 {
  background-color: #c92804;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
}

.btn-register3:hover {
  background-color: #d92b04;
}

.remove-opacity {
  background-color: transparent;
  opacity: 1 !important;
  cursor: default !important;
  border-bottom: 2px solid transparent !important;
  position: relative;
  color: black;
}

.isShowSelect {
  background-color: transparent;
  opacity: 1 !important;
  padding-left: 0;
  position: relative;
  cursor: default !important;
  color: black;
}

.ml {
  margin-left: -15px;
}

.display-none {
  display: none !important;
}

.display-block {
  display: inline-block !important;
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
</style>
