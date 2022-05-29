<template>
  <q-page class="auth-container">
    <q-dialog
      v-model="openMatriculaDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Instrucciones de matriculación</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h7">
            Va a ser redireccionado al pago del curso "{{
              this.cursoSeleccionado[1].nombre
            }}".
          </div>
          <div class="text-h7">
            El importe será de {{ this.cursoSeleccionado[1].precio }} €
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="matriculav2(this.cursoSeleccionado[1].priceid)"
          >
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="openMatriculaGratisDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Instrucciones de matriculación</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h7">
            ¿Quieres matricularte en este curso gratuito?
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="matriculaGratis(this.cursoSeleccionado)"
          >
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Cursos en E-Schools</div>
    </div>
    <div class="top-info" style="min-height: 92px">
      <div class="query-found">
        <q-icon class="icon-drawer" color="white" name="fa-solid fa-hashtag" />
        <div>{{ Object.values(this.cursos).length }} resultados</div>
      </div>

      <div class="search-container">
        <input
          type="text"
          class="search-input"
          v-model="search"
          placeholder="Buscar..."
        />
      </div>
    </div>

    <q-list>
      <q-item
        class="each-item"
        v-for="(item, index) in filteredCursos"
        :key="index"
        @click="goCurso(index)"
      >
        <div class="no-solo-alum">
          <q-item-section side class="precio-container">
            <div class="precio">{{ item[1].precio }}</div>
            <div class="euros">€</div>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" style="font-size: 1.1em">{{
              item[1].nombre
            }}</q-item-label>
            <q-item-label style="font-size: 1em" caption>{{
              item[1].descripcion
            }}</q-item-label>
          </q-item-section>
        </div>

        <div
          class="solo-alum"
          style="display: flex; align-items: center"
          v-if="this.rol == 'alumno'"
        >
          <div class="yaestoymat" v-if="checkMatricula(item[0])">
            Ya estás en<br />este curso
          </div>

          <div class="yaestoymat2" v-if="checkMatricula(item[0])">
            Ya estás en este curso
          </div>
          <div v-else style="display: flex; align-items: center">
            <div class="btnMatricularse" @click="matriculacionDialog(item)">
              Matricularse
            </div>
          </div>
        </div>
      </q-item>
    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-if="Object.values(this.cursos).length >= 8"
        v-model="page"
        :min="currentPage"
        :max="Math.ceil(Object.values(this.cursos).length / totalPages)"
        :max-pages="3"
        boundary-numbers
        direction-links
      >
      </q-pagination>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useMeta } from "quasar";

const metaData = {
  title: "E-Schools - Cursos",
};

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      cursos: {},
      rol: "",
      openMatriculaDialog: false,
      openMatriculaGratisDialog: false,
      matriculas: {},
      userid: "",
      search: "",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 8,
      cursoSeleccionado: {},
      username: "",
    };
  },
  setup() {
    useMeta(metaData);
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadCursos() {
      let cursos;
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/index", config)
        .then((response) => {
          console.log("conexion correcta load cursos");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            cursos = response.data.cursos;
            console.log(cursos);
            this.cursos = cursos;
            console.log("adsdsdsadasd");
            console.log(Object.values(this.cursos).length);
          }
        })
        .catch((e) => {
          console.log("error de conexion load cursos");
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
      this.$router.push("/curso/" + index);
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
            //this.rol = response.data.user.rol
            this.userid = response.data.uid;
            this.getMatriculasFromUser();
            this.rol = response.data.user.rol;
            this.username =
              response.data.user.nombre + " " + response.data.user.apellidos;
          } else {
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },

    matriculacionDialog(item) {
      this.cursoSeleccionado = item;
      if (item[1].precio > 0) {
        this.openMatriculaDialog = true;
      } else {
        this.openMatriculaGratisDialog = true;
      }
    },

    matriculav2(priceid) {
      let data = {
        cursopriceid: priceid,
      };
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .post("/matricula/create-checkout-session", data, config)
        .then((response) => {
          console.log("conexion correcta createcheckout");
          console.log(response);
          if (response.status == 200) {
            window.location.href = response.data.url;
          }
        });
    },

    getMatriculasFromUser() {
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      console.log("url: /matricula/getmatriculabyuser/" + this.userid);
      api
        .get("/matricula/getmatriculabyuser/" + this.userid, config)
        .then((response) => {
          console.log("conexion correcta load matriculas from user");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            let matriculas = response.data.matricula;
            console.log(matriculas);
            this.matriculas = matriculas;
            console.log("adsdsdsadasd");
            console.log(Object.values(this.matriculas).length);
          }
        })
        .catch((e) => {
          console.log("error de conexion load matriculas from user");
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

    checkMatricula(matriculaid) {
      for (let aux in this.matriculas) {
        if (this.matriculas[aux].idcurso == matriculaid) {
          return true;
        }
      }
      return false;
    },
    matriculaGratis() {
      console.log("cursoseleccionado");
      console.log(this.cursoSeleccionado);
      let data = {
        idalumno: this.userid,
        idcurso: this.cursoSeleccionado[0],
        nombreAlumno: this.username,
        nombreCurso: this.cursoSeleccionado[1].nombre,
      };
      console.log("datas");
      console.log(data);

      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .post("/matricula/storeFree/", data, config)
        .then((response) => {
          console.log("conexion correcta add matricula free");
          if (response.status == 200) {
            console.log("conexion correcta2");
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log("error de conexion matricula gratis");
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
  },

  mounted() {
    console.log("mounted");
    //console.log($route.meta)
    this.checkUserLogged();
    this.loadCursos();
  },
  computed: {
    filteredCursos: function () {
      return Object.values(this.cursos)
        .filter((curso) =>
          String(curso[1].nombre).toLowerCase().match(this.search.toLowerCase())
        )
        .slice(
          (this.page - 1) * this.totalPages,
          (this.page - 1) * this.totalPages + this.totalPages
        );
    },
  },
  watch: {
    search: function () {
      this.page = 1;
    },
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

.no-solo-alum {
  display: flex;
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

.precio-container {
  width: 160px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #c92804;
  position: relative;
}

.precio-container::before {
  content: "";
  position: absolute;
  left: 10px;
  bottom: -10px;
  width: 15px;
  height: 2px;
  background-color: #c92804;
}

.precio {
  font-size: 2.25em;
}

.euros {
  font-size: 1em;
  align-self: flex-end;
  margin-bottom: 8px;
  margin-left: 5px;
  text-shadow: 1px 1px 1px rgba(1, 1, 1, 0.3);
}

.each-item {
  display: flex;
  justify-content: space-between;
}

.btnMatricularse {
  background-color: #05beed;
  padding: 10px;
  color: black;
  cursor: pointer;
  border-radius: 3px;
}

.btnMatricularse:hover {
  background-color: #12ccfc;
}

.yaestoymat {
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: center;
  text-align: center;
}

.yaestoymat2 {
  display: none;
  align-items: center;
  width: 200px;
  justify-content: center;
  text-align: center;
}

.solo-alum {
  margin-left: 20px;
}

@media (max-width: 1079px) {
  .precio-container {
    width: 100px;
  }
}

@media (max-width: 480px) {
  .search-input {
    width: 160px;
  }

  .precio-container {
    width: 80px;
  }

  .each-item {
    flex-direction: column;
  }

  .no-solo-alum {
    order: 2;
  }

  .solo-alum {
    order: 1;
    margin-bottom: 20px;
    margin-left: 0;
  }

  .yaestoymat {
    display: none;
  }

  .yaestoymat2 {
    display: flex;
    margin-left: -25px;
  }
}
</style>
