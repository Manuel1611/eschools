<template>
  <q-page class="auth-container">
    <q-dialog
      v-model="openCalificarDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Añadir un comentario al axamen de<br />
            {{ this.calificacion.nombre + " " + this.calificacion.apellidos }}
          </div>
          <div>{{ this.calificacion.email }}</div>
        </q-card-section>

        <q-card-section
          style="font-size: 1.1em"
          class="input-container q-pt-none"
        >
          <label
            >Nota:
            <span
              :class="
                this.calificacion.nota < 5 ? 'suspenso shad' : 'aprobado shad'
              "
              >{{ Math.round(this.calificacion.nota * 10) / 10 }}</span
            ></label
          >
        </q-card-section>
        <q-card-section
          style="font-size: 1.1em"
          class="input-container q-pt-none"
        >
          <label>Comentario</label>
          <textarea v-model="this.calificacion.comentario"></textarea>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div class="logout-btn-yes" @click="submitForm()">Aceptar</div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="openCommentDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Comentario</div>
        </q-card-section>

        <q-card-section
          style="font-size: 1.1em"
          class="input-container q-pt-none"
        >
          {{ comment }}
        </q-card-section>
        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cerrar</div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>{{ this.examen.titulo }}</div>
    </div>
    <div class="top-info">
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div class="lohanrealizado">
      El examen lo han realizado
      {{ Object.values(this.realizados).length }} de
      {{
        Object.values(this.realizados).length +
        Object.values(this.noRealizados).length
      }}
      alumnos
    </div>
    <q-list class="list">
      <div class="title-uno">
        <q-icon
          class="icon-drawer chg-icon"
          color="white"
          name="fa-solid fa-check"
        />
        <div class="al">Alumnos que han hecho el examen</div>
      </div>
      <div class="borders-mios-outer">
        <q-item
          v-for="(item, index) in this.realizados"
          :key="index"
          class="item borders-mios"
        >
          <div class="user-container">
            <div class="user-container2">
              <div class="icon-user">
                <q-icon
                  class="icon-drawer"
                  color="grey-8"
                  name="fa-solid fa-user"
                />
              </div>
              <div class="user-inner">
                <div style="font-size: 1.1em">
                  {{ item[1].nombre + " " + item[1].apellidos }}
                </div>
                <div style="font-size: 1em; color: rgba(1, 1, 1, 0.6)">
                  {{ item[1].email }}
                </div>
              </div>
            </div>
            <div
              v-if="
                this.mostrar[index] == false || this.mostrar[index] == undefined
              "
              class="btn-register2"
              style="margin-left: 20px"
              @click="mostrarExamen(index)"
            >
              Ver examen
            </div>
            <div
              v-if="
                this.mostrar[index] == 'true' || this.mostrar[index] == true
              "
            >
              <div class="exam-bar">
                <div
                  v-for="(item2, index2) in item[1].realizado[idexamen]
                    .preguntasNuevas"
                  :key="index2"
                  class="pregunta-container"
                >
                  <div class="pregunta-title">
                    <div class="question-icon-mio">
                      <q-icon
                        class="icon-drawer no-margins2 question-m"
                        color="white"
                        name="fa-solid fa-question"
                      />
                    </div>

                    <p>
                      {{ item2.pregunta }}
                    </p>
                  </div>
                  <div class="pregunta-respuesta">
                    <div
                      v-if="
                        item2.solucion == this.examen.preguntas[index2].solucion
                      "
                      class="question-icon-mio2"
                    >
                      <q-icon
                        class="icon-drawer no-margins2 question-m"
                        color="white"
                        name="fa-solid fa-check"
                      />
                    </div>
                    <div
                      v-if="
                        item2.solucion != this.examen.preguntas[index2].solucion
                      "
                      class="question-icon-mio3"
                    >
                      <q-icon
                        class="icon-drawer no-margins2 question-m"
                        color="white"
                        name="fa-solid fa-xmark"
                      />
                    </div>
                    {{
                      this.examen.preguntas[index2].respuesta[item2.solucion]
                        .value
                    }}
                  </div>
                </div>
              </div>
              <div
                class="btn-register2"
                style="margin-left: 20px"
                @click="ocultarExamen(index)"
              >
                Ocultar examen
              </div>
            </div>
          </div>
          <div
            class="div-calif"
            v-if="
              item[1].realizado[idexamen].nota != undefined &&
              item[1].realizado[idexamen].nota > -1
            "
          >
            <div class="nota-calif">
              <q-icon
                v-if="item[1].realizado[idexamen].comentario != ''"
                @click="
                  openCommentDialog = true;
                  comment = item[1].realizado[idexamen].comentario;
                "
                class="activate-bubble cursor-pointer"
                name="fa-solid fa-comment"
                color="white"
              />
              <q-icon
                v-else
                class="activate-bubble cursor-null"
                name="fa-solid fa-comment"
                color="white"
              />
              <span
                :class="
                  item[1].realizado[idexamen].nota < 5 ? 'suspenso' : 'aprobado'
                "
                >{{
                  Math.round(item[1].realizado[idexamen].nota * 10) / 10
                }}</span
              >
              / 10
            </div>
          </div>
          <div v-else>Examen sin calificar</div>
          <div
            v-if="item[1].realizado[idexamen].comentario == ''"
            class="btn-evaluar"
            @click="calificarDialog(item[0], item[1])"
          >
            Comentar
          </div>
          <div v-else class="btn-evaluar2"></div>
        </q-item>
      </div>
    </q-list>

    <q-list class="list">
      <div class="title-uno">
        <q-icon
          class="icon-drawer chg-icon2"
          color="white"
          name="fa-solid fa-xmark"
        />
        <div class="al">Alumnos que no han hecho el examen</div>
      </div>
      <div class="borders-mios-outer">
        <q-item
          v-for="(item, index) in this.noRealizados"
          :key="index"
          class="item borders-mios"
        >
          <div class="user-container">
            <div class="icon-user">
              <q-icon
                class="icon-drawer"
                color="grey-8"
                name="fa-solid fa-user"
              />
            </div>
            <div class="user-inner">
              <div style="font-size: 1.1em">
                {{ item[1].nombre + " " + item[1].apellidos }}
              </div>
              <div style="font-size: 1em; color: rgba(1, 1, 1, 0.6)">
                {{ item[1].email }}
              </div>
            </div>
          </div>
          <div>Examen sin realizar</div>
        </q-item>
      </div>
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
      realizados: {},
      noRealizados: {},
      idcurso: "",
      idexamen: "",
      mostrar: [],
      //server: "http://localhost:3000/public/",
      calificacion: {
        nombre: "",
        apellidos: "",
        email: "",
        id: "",
        nota: "",
        comentario: "",
      },
      openCalificarDialog: false,
      bloqueid: "",
      examen: {},
      openCommentDialog: false,
      comment: "",
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    ocultarExamen(usuario) {
      this.mostrar[usuario] = false;
    },
    mostrarExamen(usuario) {
      this.mostrar[usuario] = true;
    },
    goBack() {
      this.$router.push("/curso/" + this.idcurso);
    },
    loadRealizados() {
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      console.log(token);
      let config = {
        headers: {
          "x-access-token": token,
        },
      };

      console.log("/examen/getExamenesRealizado/" + this.idexamen);
      api
        .get("/examen/getExamenesRealizado/" + this.idexamen, config)
        .then((response) => {
          console.log("conexion correcta3");
          if (response.status == 200) {
            console.log("conexion correcta4");
            console.log(response.data);
            this.realizados = response.data.usuarios;
          }
        });
    },
    loadNoRealizados() {
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      console.log(token);
      let config = {
        headers: {
          "x-access-token": token,
        },
      };

      console.log(
        "/examen/getExamenesNoRealizado/" + this.idcurso + "/" + this.idexamen
      );
      api
        .get(
          "/examen/getExamenesNoRealizado/" +
            this.idcurso +
            "/" +
            this.idexamen,
          config
        )
        .then((response) => {
          console.log("conexion correcta3");
          if (response.status == 200) {
            console.log("conexion correcta4");
            console.log(response.data);
            this.noRealizados = response.data.usuarios;
          }
        });
    },

    loadExamen() {
      let examenes;
      console.log("/curso/" + this.idcurso + "/examen/" + this.idexamen);
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/" + this.idcurso + "/examen/" + this.idexamen, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            examenes = response.data.examen;
            this.examen = examenes;
            console.log(this.examen);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    calificarDialog(id, user) {
      this.calificacion.nombre = user.nombre;
      this.calificacion.apellidos = user.apellidos;
      this.calificacion.email = user.email;
      this.calificacion.id = id;
      this.calificacion.nota = user.realizado[this.idexamen].nota;
      this.calificacion.comentario = "";
      this.openCalificarDialog = true;
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
            q.notify({
              color: "negative",
              position: "top",
              message: "Sesión caducada.",
              icon: "report_problem",
            });
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          $q.notify({
            color: "negative",
            position: "top",
            message: e,
            icon: "report_problem",
          });
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },

    submitForm() {
      if (this.calificacion.comentario != "") {
        let data = {
          comentario: this.calificacion.comentario,
          examen: this.idexamen,
          iduser: this.calificacion.id,
        };
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .post("/examen/uploadComentario", data, config)
          .then((response) => {
            if (response.status == 200) {
              console.log("Enviado el comentario");
              console.log(response);
              window.location.reload();
            } else {
              console.log("NO SE HA ENVIADO");
              this.emailError("No se ha podido enviar el comentario");
            }
          })
          .catch((error) => {
            console.log("erro de load comentario");
            console.log(error);
            this.emailError("No se ha podido enviar el comentario");
          });
      }
    },
  },
  mounted() {
    this.checkUserLogged();
    if (this.$route.query.bloqueid != "") {
      console.log(" a v c");
      console.log(this.$route);
      this.bloqueid = this.$route.query.bloqueid;
    }
    this.idexamen = this.$router.currentRoute._value.params.idexamen;
    this.idcurso = this.$router.currentRoute._value.params.idcurso;
    this.loadExamen();
    this.loadRealizados();
    this.loadNoRealizados();
  },
});
</script>

<style scoped>
.q-page {
  padding: 20px;
}

.no-margins3 {
  margin: 0;
}

.btn-register2 {
  background-color: #4287f5;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-left: 0 !important;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btn-register2:hover {
  background-color: #5f9bfa;
}
.pregunta-container {
  margin: 40px;
  padding: 15px;
  border: 2px solid #f5f5f5;
  position: relative;
}

.pregunta-input {
  width: 40%;
  min-width: 300px;
  padding: 5px 0;
  outline: none;
  border: 0;
  border-bottom: 2px solid #226294;
  margin-bottom: 15px;
}

.pregunta-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 15px;
  font-weight: 500;
}
.pregunta-respuesta {
  position: relative;
}

.no-margins2 {
  margin: 0;
  margin-right: 6px;
}

.respuesta-container {
  margin: 10px 0;
  border: 2px solid #f5f5f5;
  margin-left: 40px;
  padding: 15px;
  display: flex;
  flex-direction: row !important;
  align-items: center;
}

.respuesta-title {
  margin-left: 25px;
  margin-bottom: 4px;
}
.question-icon-mio {
  position: absolute;
  background-color: rgb(95, 155, 201);
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 16px;
  left: -24px;
  transform: rotate(45deg);
}

.question-m {
  position: absolute;
  transform: rotate(315deg);
  margin: 0;
  font-size: 1.5em;
}

.question-icon-mio2 {
  position: absolute;
  background-color: #038a24;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -2px;
  left: -47px;
  transform: rotate(45deg);
}

.question-icon-mio3 {
  position: absolute;
  background-color: #db1512;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -2px;
  left: -47px;
  transform: rotate(45deg);
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

.activate-bubble {
  cursor: pointer;
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

.list {
  margin-top: 30px;
}

.item {
  margin-top: 25px;
  padding-bottom: 30px;
  border-bottom: 2px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.user-container {
  display: column;
  align-items: flex-start;
}
.user-container2{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.icon-user {
  margin-right: 15px;
}

.icon-user i {
  font-size: 1.5em;
}

.realizado-container {
  position: relative;
  margin-left: 50px;
}

.realizado-container:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100px;
  background-color: #f5f5f5;
  top: -33px;
  left: -20px;
}

.realizado-container a {
  text-decoration: none;
  color: black;
}

.realizado-container a:hover {
  text-decoration: underline;
}

.btn-evaluar {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
  min-width: 90px;
  text-align: center;
}

.btn-evaluar2 {
  background-color: transparent;
  display: inline-block;
  padding: 10px;
  color: white;
  border-radius: 3px;
  font-size: 1.1em;
  margin-right: 10px;
  min-width: 90px;
  text-align: center;
}

.btn-evaluar:hover {
  background-color: #30c954;
}

.input-container {
  display: flex;
  flex-direction: column;
}

textarea {
  resize: none;
  border: 0;
  outline: none;
  padding: 5px;
  margin-top: 5px;
}

.input-nota {
  border: 0;
  outline: none;
  padding: 5px;
  margin-top: 5px;
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

.user-inner {
  width: 275px;
}

.nota-calif {
  font-size: 1.3em;
}

.suspenso {
  color: #eb4034;
}

.aprobado {
  color: #21ba45;
}

.activate-bubble {
  margin-right: 10px;
  font-size: 0.65em;
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #03b1fc;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-null {
  cursor: not-allowed;
}

.shad {
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.5);
  font-size: 1.5em;
}

.lohanrealizado {
  font-size: 1.1em;
  margin-top: 35px;
}

.title-uno {
  font-size: 1.3em;
  display: flex;
  align-items: center;
  margin-bottom: -23px;
}

.title-uno .q-icon {
  margin-right: 10px;
}

.borders-mios-outer {
  border-top: 2px solid #bdbcbb;
  border-left: 2px solid #bdbcbb;
  margin-top: 10px;
}

.chg-icon {
  padding: 20px;
  background-color: #21ba45;
  margin-bottom: 11px;
}

.chg-icon2 {
  padding: 20px;
  background-color: #eb4034;
  margin-bottom: 11px;
}

.al {
  background-color: #e3e3e3;
  padding: 15px;
  margin-top: 4px;
  margin-left: -10px;
  padding-top: 14px;
}
</style>
