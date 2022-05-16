<template>
  <q-page class="auth-container">
    <q-dialog
      v-model="openBajaDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">¿Quieres dar de baja a...?</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          {{ correoBajaAlta }}
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="darBaja(idBajaAlta)"
          >
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="openAltaDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">¿Quieres dar de alta a...?</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          {{ correoBajaAlta }}
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="darAlta(idBajaAlta)"
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
      <div>Matrículas en E-Schools</div>
    </div>
    <div class="top-info">
      <div class="query-found">
        <q-icon class="icon-drawer" color="white" name="fa-solid fa-hashtag" />
        <div>{{ Object.values(this.matriculas).length }} resultados</div>
      </div>
      <div class="btn-addnew" @click="goAddmatricula">Añadir nuevo</div>
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
        v-for="(item, index) in matriculas"
        :key="index"
      >
        <q-item-section avatar top>
          <q-avatar
            style="cursor: pointer"
            v-if="item.activa"
            @click="
              openAltaDialog = true;
              idBajaAlta = item;
            "
            icon="fa-solid fa-arrow-up"
            color="positive"
            text-color="white"
          />
          <q-avatar
            style="cursor: pointer"
            v-else
            @click="
              openBajaDialog = true;
              idBajaAlta = item;
            "
            icon="fa-solid fa-arrow-down"
            color="negative"
            text-color="white"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" style="font-size: 1.1em">{{
            item.nombreAlumno + " - " + item.nombreCurso
          }}</q-item-label>
          <q-item-label style="font-size: 1em" caption>{{
            item.fechafin + " - " + item.fechainicio
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon class="activate-bubble" name="info" color="green" />
          <div v-if="item.activa" class="bubble">Activo</div>
          <div v-else class="bubble">Inactivo</div>
        </q-item-section>

        <q-item-section side>
          <q-avatar
            style="cursor: pointer"
            @click="gomatricula(index)"
            icon="fa-solid fa-pencil"
            color="primary"
            text-color="white"
          />
        </q-item-section>
      </q-item>
    </q-list>
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
      openBajaDialog: false,
      openAltaDialog: false,
      idBajaAlta: "",
      matriculas: {},

      cursos: {},
      alumnos: {},
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadmatriculas() {
      console.log('cargando matricula')
      let matriculas;
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get("/matricula/index", config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            console.log("aaa" + matriculas);
            matriculas = response.data.matricula;

            this.matriculas = matriculas;
            console.log(this.matriculas);
          }
        })
        .catch((e) => {
          console.log("error de conexionesss");
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

    goAddmatricula() {
      this.$router.push("/admin/matricula/add");
    },

    gomatricula(index) {
      console.log(index);
      this.$router.push("/admin/matricula/" + index);
    },

    loadUser(userId) {
      //console.log(userId);
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get("/user/" + userId, config)
        .then((response) => {
          if (response.status == 200) {
            //console.log(response.data);
            let nombreUsuario = response.data.usuario.nombre;
            console.log(nombreUsuario);

            return nombreUsuario;
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    loadCurso(cursoId) {
      console.log(cursoId);
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get("/curso/" + cursoId. config)
        .then((response) => {
          if (response.status == 200) {
            //console.log(response.data);
            let nombreCurso = response.data.curso.nombre;
            console.log(nombreCurso);

            return nombreCurso;
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
  },

  mounted() {
    console.log("mounted");
    this.loadmatriculas();
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
