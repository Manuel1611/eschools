<template>
  <q-page class="auth-container">
    <!---->
    <!---->
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Mis cursos</div>
    </div>
    <div class="top-info">
      <div class="search-container" style="height: 92px"></div>
    </div>

    <q-list>
      <q-item class="each-item" v-for="(item, index) in cursos" :key="index">
        <q-item-section>
          <q-item-label lines="1" style="font-size: 1.1em">{{
            item.nombre
          }}</q-item-label>
          <q-item-label style="font-size: 1em" caption>{{
            item.descripcion
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-avatar
            v-if="this.rol == 'Alumno' || this.rol == 'alumno'"
            style="cursor: pointer"
            @click="goCurso(index)"
            icon="fa-solid fa-book-open-reader"
            color="primary"
            text-color="white"
          />

          <q-avatar
            v-else
            style="cursor: pointer"
            @click="goEditCurso(index)"
            icon="fa-solid fa-pencil"
            color="primary"
            text-color="white"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-section
      style="display: flex; align-items: center"
      v-if="this.cursos == undefined || Object.values(this.cursos).length == 0"
    >
      <q-icon
        style="margin-right: 10px"
        class="icon-drawer"
        color="black"
        name="fa-solid fa-right-long"
      />
      <p style="margin: 0">Aún no te has matriculado en ningún curso...</p>
    </q-card-section>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useMeta } from "quasar";

const metaData = {
  title: "E-Schools - Mis cursos",
};

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      cursos: {},
      matriculas: {},
      rol: "",
    };
  },
  setup() {
    useMeta(metaData);
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadCurso(index) {
      console.log("CARGANDO CURSO" + index);
      let cursos = [];
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/" + index, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            let curso = response.data.curso;
            //console.log(curso);
            //this.cursos.push(curso);
            this.cursos[index] = curso;
            console.log("this.cursos: ");
            console.log(this.cursos);
            //console.log(Object.values(this.cursos).length );
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

    loadAllCursos() {
      let cursos = [];
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/index", config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            let cursos = response.data.cursos;
            for (let i in cursos) {
              this.cursos[cursos[i][0]] = cursos[i][1];
            }

            //console.log(curso);
            //this.cursos.push(curso);
            response.data.cursos;
            console.log("this.cursos: ");
            console.log(this.cursos);
            //console.log(Object.values(this.cursos).length );
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

    goCurso(index) {
      this.$router.push("/curso/miscursos/" + index);
    },
    goEditCurso(index) {
      this.$router.push("/curso/" + index);
    },

    loadMatriculas(userid) {
      console.log("loading matriculas");
      let matriculas;
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/matricula/getmatriculabyuser/" + userid, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            matriculas = response.data.matricula;
            console.log(matriculas);
            this.matriculas = matriculas;
            if (matriculas != undefined) {
              console.log("Matriculas");
              console.log(matriculas);
              for (let i = 0; i < matriculas.length; i++) {
                console.log("curso: ");
                console.log(matriculas[i].idcurso);
                this.loadCurso(matriculas[i].idcurso);
              }
            }
            //console.log(Object.values(this.cursos).length );
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

    loadCursosFromProfesor(profesor) {
      console.log("loading cursos from profesor");
      console.log(profesor.cursos);
      for (let i in profesor.cursos) {
        console.log("este es el curso");
        console.log(profesor.cursos[i].curso);
        this.loadCurso(profesor.cursos[i].curso);
      }
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
            console.log(response.data.uid);
            this.rol = response.data.user.rol;
            if (this.rol == "Alumno" || this.rol == "alumno") {
              console.log("soy alumno");
              this.loadMatriculas(response.data.uid);
            } else if (this.rol == "Profesor" || this.rol == "profesor") {
              console.log("soy profesor");
              this.loadCursosFromProfesor(response.data.user);
              console.log("soy admin");
            } else if (
              this.rol == "Administrador" ||
              this.rol == "administrador"
            ) {
              this.loadAllCursos();
            } else {
              console.log("no soy nada " + this.rol);
            }
          } else {
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          //this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },
  },

  mounted() {
    console.log("mounted");
    this.checkUserLogged();
    //this.loadMatriculas("kmhHWDypPBcFTqErFSsFazwBpkt2");
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

.btn-addnew {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
}

.each-item {
  margin: 25px 0;
  padding: 16px 0;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 40px;
}

.background-myblue {
  background-color: #226294;
}

.logoutModal-margins {
  margin: 20px 0;
  border-radius: 0 !important;
  padding: 0;
}

.btn-addnew:hover {
  background-color: #30c954;
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

.bubble {
  position: absolute;
  top: -15px;
  width: 100px;
  height: 25px;
  background-color: #d6d6d6;
  border-radius: 3px;
  box-shadow: 1px 1px 2px rgba(1, 1, 1, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.2s ease;
  font-size: 1.1em;
  color: black;
}

.bubble::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 78%;
  widows: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #d6d6d6;
  border-bottom: 0;
  border-right: 0;
  margin-left: 0;
  margin-bottom: -10px;
}

.activate-bubble {
  cursor: pointer;
}

.activate-bubble:hover ~ .bubble {
  opacity: 1;
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
  font-size: 1.1em;
  color: white;
  display: flex;
  align-items: center;
}

.search-input {
  margin-right: 20px;
  padding: 10px 5px;
  width: 250px;
  outline: none;
  border: 0;
  font-size: 1.1em;
  border-radius: 3px;
}
</style>
