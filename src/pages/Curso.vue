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
          <div class="text-h6">Instrucciones de matriculacion</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h7">Para matricularse haga una transferencia con el precio del curso y mande el justificante de pago al correo admin@eschools.com</div>
          <div class="text-h7">IBAN: ES12 1234 1234 1212 3456 7890</div>
          <div class="text-h7">Beneficiario: E-Schools</div>
          <div class="text-h7">Concepto: *Nombre apellidos usuario* * Nombre del curso *</div>
        </q-card-section>


        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-yes" v-close-popup>Aceptar</div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Cursos en E-Schooless</div>
    </div>
    <div class="top-info">
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
      <q-item class="each-item" v-for="(item, index) in cursos" :key="index" @click="goCurso(index)">
        <q-item-section>
          <q-item-label lines="1" style="font-size: 1.1em">{{
            item[1].nombre + " - " + item[1].precio + "€"
          }}</q-item-label>
          <q-item-label style="font-size: 1em" caption>{{
            item[1].descripcion
          }}</q-item-label>
        </q-item-section>
        <!--<q-btn @click="matriculacionDialog">Matricularte</q-btn>-->
        <q-btn @click="matriculav2(item[1].priceid)">Matricularte v2</q-btn>
<!--
        <q-item-section side>
          <q-avatar
            style="cursor: pointer"
            @click="goCurso(item[0])"
            icon="fa-solid fa-pencil"
            color="primary"
            text-color="white"
          />
        </q-item-section>
-->
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
      cursos: {},
      rol :'',
      openMatriculaDialog: false,
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadCursos() {
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
          console.log("conexion correcta load cursos");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            cursos = response.data.cursos;
            console.log(cursos);
            this.cursos = cursos;
            console.log('adsdsdsadasd')
            console.log(Object.values(this.cursos).length );
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
          'x-access-token' : token
        }
      }
      api
        .post("/auth/checksessiontoken", {}, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 22222");
            this.rol = response.data.user.rol
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

    matriculacionDialog() {
      this.openMatriculaDialog = true
    },

    matriculav2(priceid){
      let data = {
        cursopriceid: priceid
      }
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .post("/matricula/create-checkout-session", data, config)
        .then((response) => {
          console.log("conexion correcta createcheckout");
          console.log(response)
          if (response.status == 200) {
            console.log("conexion correcta token 22222");
          }
      })
    }
  },

  mounted() {

    console.log("mounted");
    //console.log($route.meta)
    this.checkUserLogged()
    this.loadCursos();
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
