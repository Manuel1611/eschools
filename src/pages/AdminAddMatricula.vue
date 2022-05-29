<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Gestiona las matrículas</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>
          Matricula a los distintos usuarios de E-Schools en los diferentes
          cursos disponibles
        </div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div class="form-container">
      <div>
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
              class="btn-register"
              type="button"
              name="button"
              @click="submitForm"
              value="Matricular"
            />
          </div>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useMeta } from "quasar";

const metaData = {
  title: "E-Schools - Añadir matrícula",
};

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
    useMeta(metaData);
    const $q = useQuasar();
    return {
      registerError(msg) {
        $q.notify({
          message: msg,
          color: "red",
          badgeStyle: "opacity: 0",
        });
      },
      registerOk(msg) {
        $q.notify({
          message: msg,
          color: "green",
          badgeStyle: "opacity: 0",
        });
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/matricula");
    },
    submitForm() {
      console.log("kek");
      if (this.matricula.usuario != "" && this.matricula.curso != "") {
        let nombreAlumno = "";
        let nombreCurso = "";
        console.log("matricula usuario: " + this.matricula.usuario);
        for (let i = 0; i < this.students.length; i++) {
          if (this.students[i][0] == this.matricula.usuario) {
            console.log("entro en el if");
            console.log(this.students[i][1].nombre);
            nombreAlumno =
              this.students[i][1].nombre + " " + this.students[i][1].apellidos;
          }
        }
        for (let i = 0; i < this.courses.length; i++) {
          if (this.courses[i][0] == this.matricula.curso) {
            nombreCurso = this.courses[i][1].nombre;
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
            "x-access-token": token,
          },
        };
        api
          .post("/matricula/store", data, config)
          .then((response) => {
            console.log(response);
            this.registerOk("Matrícula realizada correctamente");
            this.matricula.usuario = "";
            this.matricula.curso = "";
          })
          .catch((e) => {
            this.registerError("No se ha podido realizar la matriculación");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },

    loadStudents() {
      let cursos;
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
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
          "x-access-token": token,
        },
      };
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
          "x-access-token": token,
        },
      };
      api
        .post("/auth/checksessiontoken", {}, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 22222");
          } else {
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },
  },

  mounted() {
    this.checkUserLogged();
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

form > div {
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

@media (max-width: 1079px) {
  select {
    width: 90% !important;
  }

  .top-info {
    flex-direction: column;
  }

  .query-found {
    margin-bottom: 13px;
  }

  .btn-addnew {
    margin-bottom: 70px;
    align-self: flex-start;
    margin-right: 0;
    margin-left: 25px;
  }
}

@media (max-width: 480px) {
  .btn-addnew {
    margin-bottom: 75px;
  }

  .query-found {
    margin-bottom: 10px;
  }
}
</style>
