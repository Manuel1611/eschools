<template>
  <q-page class="auth-container">
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>{{ this.examen.titulo }}</div>
    </div>

    <div class="top-info">
      <div class="query-found"></div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div v-if="this.haciendo == 'false' || this.haciendo == false">
      <div class="aun-no-hecho">
        <q-icon
          v-if="this.realizado == 'false' || this.realizado == false"
          class="icon-drawer"
          color="black"
          name="fa-solid fa-angle-right"
        />
        <div v-if="this.realizado == 'false' || this.realizado == false">
          No has realizado el examen aún...
        </div>
        <div v-else>{{ this.examen.descripcion }}</div>
      </div>
      <div
        v-if="this.realizado == 'false' || this.realizado == false"
        class="reminder"
      >
        Recuerda que por cada pregunta errónea se resta una correcta
      </div>
      <!---------------------------------------------->
      <!---------------------------------------------->
      <!---------------------------------------------->
      <!---------------------------------------------->
      <!---------------------------------------------->
      <div class="items-list">
        <q-section v-if="this.realizado == 'true' || this.realizado == true">
          <div class="aun-no-hecho">
            <div style="margin-bottom: 15px">Ya has realizado este examen</div>
          </div>

          <q-section>
            <span class="nota-container"
              ><span :class="this.nota < 5 ? 'color-red' : 'color-green'">{{
                Math.round(this.nota * 10) / 10
              }}</span></span
            >
            <div class="com-container">
              <div v-if="this.comentario != ''">
                <div class="com-1">
                  <q-icon
                    class="comment-icon icon-drawer"
                    color="grey-8"
                    name="fa-solid fa-comment"
                  />Tu profesor dice...
                </div>
                <div class="com-2">"{{ this.comentario }}"</div>
              </div>
              <div v-else>
                <div class="com-1">
                  <q-icon
                    class="comment-icon icon-drawer"
                    color="grey-8"
                    name="fa-solid fa-comment"
                  />&nbsp;No hay comentarios...
                </div>
              </div>
              <div
                v-if="this.mostrar == false"
                class="btn-register2"
                style="margin-left: 20px"
                @click="mostrarExamen"
              >
                Ver examen
              </div>

              <div v-if="this.mostrar == 'true' || this.mostrar == true">
                <div class="exam-bar"></div>
                <div
                  v-for="(find, index) in examen.preguntas"
                  :key="index"
                  class="pregunta-container"
                >
                  <div
                    v-for="(find2, index2) in find.respuesta"
                    :key="index2"
                    style="position: relative"
                  >
                    <div
                      v-if="
                        find.solucion ==
                          this.examenNuevo.preguntasNuevas[index].solucion &&
                        find.solucion == index2
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
                        find.solucion !=
                          this.examenNuevo.preguntasNuevas[index].solucion &&
                        find.solucion != index2
                      "
                      class="question-icon-mio3"
                    >
                      <q-icon
                        class="icon-drawer no-margins2 question-m"
                        color="white"
                        name="fa-solid fa-xmark"
                      />
                    </div>
                  </div>

                  <div class="pregunta-title">
                    <div class="question-icon-mio">
                      <q-icon
                        class="icon-drawer no-margins2 question-m"
                        color="white"
                        name="fa-solid fa-question"
                      />
                    </div>

                    <div>
                      {{ find.pregunta
                      }}<span
                        class="sin-contestar"
                        v-if="
                          this.examenNuevo.preguntasNuevas[index].solucion == -1
                        "
                        >&nbsp;(Sin contestar)</span
                      >
                    </div>
                  </div>
                  <div
                    v-for="(find2, index2) in find.respuesta"
                    :key="index2"
                    class="respuesta-container"
                  >
                    <div
                      v-if="
                        find.solucion ==
                          this.examenNuevo.preguntasNuevas[index].solucion &&
                        find.solucion == index2
                      "
                      class="azul"
                    ></div>
                    <div
                      v-else-if="find.solucion == index2"
                      class="verde"
                    ></div>
                    <div
                      v-else-if="
                        this.examenNuevo.preguntasNuevas[index].solucion ==
                        index2
                      "
                      class="rojo"
                    ></div>
                    <div v-else class="sin-color"></div>
                    <div>
                      {{ this.examen.preguntas[index].respuesta[index2].value }}
                    </div>
                  </div>
                </div>
                <div
                  class="btn-register2"
                  style="margin-left: 20px"
                  @click="ocultarExamen"
                >
                  Ocultar examen
                </div>
              </div>
            </div>
          </q-section>
        </q-section>
        <q-section v-else>
          <div
            v-if="this.realizado == 'false' || this.realizado == false"
            class="btn-register"
            style="margin-left: 20px"
            @click="realizarExamen"
          >
            Realizar examen
          </div>
        </q-section>
      </div>
      <!---------------------------------------------->
      <!---------------------------------------------->
      <!---------------------------------------------->
      <!---------------------------------------------->
      <!---------------------------------------------->
    </div>
    <div v-else style="margin-top: 50px">
      <q-section>
        <div
          v-for="find in arrayAletorio"
          :key="find[0]"
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

            <div>{{ examen.preguntas[find[0]].pregunta }}</div>
          </div>
          <div
            v-for="find2 in find[1]"
            :key="find2"
            class="respuesta-container"
          >
            <input
              type="radio"
              :name="'respuestas' + find[0]"
              :value="find2"
              @change="onChange($event, find[0], find2)"
            />
            <div>
              {{ this.examen.preguntas[find[0]].respuesta[find2].value }}
            </div>
          </div>
        </div>
        <div class="btn-register" @click="submitForm">Enviar examen</div>
      </q-section>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useMeta } from "quasar";

const metaData = {
  title: "E-Schools - Examen",
};

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      cursoid: "",
      examenid: "",
      userid: "",
      examen: {},
      examenNuevo: {},
      arrayAletorio: {},
      file: "",
      server: "http://localhost:3000/public/",
      error: "no carga",
      bloqueid: "",
      realizado: false,
      haciendo: false,
      mostrar: false,
      nota: -1,
      comentario: "",
      fileName: "",
    };
  },
  setup() {
    useMeta(metaData);
    const $q = useQuasar();

    return {
      emailSent(msg) {
        $q.notify({
          message: msg,
          color: "green",
          badgeStyle: "opacity: 0",
        });
      },
      emailError(msg) {
        $q.notify({
          message: msg,
          color: "red",
          badgeStyle: "opacity: 0",
        });
      },
    };
  },
  methods: {
    loadExamen() {
      console.log("loading examen");
      let examen3;
      console.log("/examen/" + this.cursoid + this.examenid);
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/" + this.cursoid + "/examen/" + this.examenid, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            examen3 = response.data.examen;
            console.log(examen3);
            this.examen = examen3;
            console.log(
              "aessejbnwfkdeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            );
            this.aleatorioExamen(examen3);
            this.newExamen(examen3);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    newExamen(examen2) {
      let examen;
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/user/" + this.userid + "/realizado/" + this.examenid, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            examen = response.data.examen;
            console.log(examen);
            this.examenNuevo = examen;
            console.log(this.examenNuevo);

            if (examen == "" || examen == "undefined" || examen == undefined) {
              this.examenNuevo = JSON.parse(JSON.stringify(examen2));
              console.log(this.examenNuevo.preguntas.length);
              for (let i = 0; i < this.examenNuevo.preguntas.length; i++) {
                this.examenNuevo.preguntas[i].respuesta = "";
                this.examenNuevo.preguntas[i].solucion = -1;
              }
            }
            console.log("original");
            console.log(this.examen);
            console.log("nuevo");
            console.log(this.examenNuevo);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    aleatorioExamen(examen2) {
      let arrayNuevo = [];
      let pregunta = "";
      let respuesta = "";
      for (let i = 0; i < examen2.preguntas.length; i++) {
        pregunta = String(Math.floor(Math.random() * examen2.preguntas.length));
        if (arrayNuevo[0] != undefined) {
          while (arrayNuevo.toString().includes(pregunta) == true) {
            pregunta = String(
              Math.floor(Math.random() * examen2.preguntas.length)
            );
          }
        }
        arrayNuevo[i] = [];
        arrayNuevo[i][0] = pregunta;
        arrayNuevo[i][1] = [];
      }
      console.log(arrayNuevo);
      for (let j = 0; j < arrayNuevo.length; j++) {
        for (
          let k = 0;
          k < examen2.preguntas[arrayNuevo[j][0]].respuesta.length;
          k++
        ) {
          respuesta = String(
            Math.floor(
              Math.random() *
                examen2.preguntas[arrayNuevo[j][0]].respuesta.length
            )
          );
          if (arrayNuevo[j][1][0] != undefined) {
            while (arrayNuevo[j][1].toString().includes(respuesta) == true) {
              respuesta = String(
                Math.floor(
                  Math.random() *
                    examen2.preguntas[arrayNuevo[j][0]].respuesta.length
                )
              );
            }
          }
          arrayNuevo[j][1][k] = respuesta;
        }
      }
      this.arrayAletorio = arrayNuevo;

      console.log(
        "----------------------------------------------------------------------"
      );
      console.log(examen2);
      console.log(this.arrayAletorio);
    },

    checkRealizado() {
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      console.log(token);
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      console.log("checkiing realizado" + this.userid);
      api
        .get(
          "/examen/checkuploadexamen/" + this.userid + "/" + this.examenid,
          config
        )
        .then((response) => {
          if (response.status == 200) {
            console.log("checkrealizado");
            console.log(response);
            this.realizado = response.data.realizado;
            this.nota = response.data.nota;
            this.comentario = response.data.comentario;
            this.fileName = response.data.filename;
          }
        })
        .catch((error) => {
          console.log("erro de check realizado.");
          console.log(error);
        });
    },

    goBack() {
      this.$router.push("/curso/miscursos/" + this.cursoid);
    },

    realizarExamen() {
      this.haciendo = true;
    },

    mostrarExamen() {
      this.mostrar = true;
    },
    ocultarExamen() {
      this.mostrar = false;
    },
    onChange($event, indicePregunta, indiceRespuesta) {
      console.log("indicepregunta:" + indicePregunta);
      console.log("indiceRespuesta:" + indiceRespuesta);
      console.log("this examne nuevo");
      console.log(this.examenNuevo);
      var seleccionado = $event.target.value;
      this.examenNuevo.preguntas[indicePregunta].solucion = seleccionado;
      this.examenNuevo.preguntas[indicePregunta].respuesta =
        this.examen.preguntas[indicePregunta].respuesta[indiceRespuesta].value;
    },

    submitForm() {
      console.log("submitting form");

      console.log(this.examenNuevo);
      let data = {
        preguntasNuevas: this.examenNuevo.preguntas,
        preguntas: this.examen.preguntas,
        examen: this.examenid,
        user: this.userid,
      };
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .post("/examen/uploadExamen", data, config)
        .then((response) => {
          if (response.status == 200) {
            console.log("Enviado el examen");
            console.log(response);
            window.location.reload();
          } else {
            console.log("NO SE HA ENVIADO");
            this.emailError("No se ha podido enviar el examen");
          }
        })
        .catch((error) => {
          console.log("error de load examen");
          console.log(error);
          this.emailError("No se ha podido enviar el examen");
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
            console.log(response.data.uid);
            this.userid = response.data.uid;
            this.checkRealizado();
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
    console.log(" a v c");
    console.log(this.$route);
    this.cursoid = this.$router.currentRoute._value.params.id;
    this.examenid = this.$router.currentRoute._value.params.idexamen;
    this.loadExamen();
  },
});
</script>

<style scoped>
.verde {
  background-color: #038a24;
  border: 1px solid #038a24;
  width: 15px;
  height: 15px;
  min-width: 15px !important;
  border-radius: 50%;
  margin-right: 10px;
}

.azul {
  background-color: #038a24;
  border: 1px solid #038a24;
  width: 15px;
  height: 15px;
  min-width: 15px !important;
  border-radius: 50%;
  margin-right: 10px;
}

.rojo {
  background-color: #db1512;
  border: 1px solid #db1512;
  width: 15px;
  height: 15px;
  min-width: 15px !important;
  border-radius: 50%;
  margin-right: 10px;
}

.sin-color {
  background-color: transparent;
  border: 1px solid grey;
  width: 15px;
  height: 15px;
  min-width: 15px !important;
  border-radius: 50%;
  margin-right: 10px;
}

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

.aun-no-hecho {
  display: flex;
  align-items: center;
  margin-top: 25px;
  font-size: 1.1em;
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

label {
  font-size: 1.1em;
  margin-top: 20px;
  position: relative;
  margin-left: 20px;
}

.no-margins {
  margin: 0;
  margin-right: 6px;
  margin-top: 4px;
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

input[type="radio"] {
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
  margin-right: 10px;
}

.no-margins3 {
  margin: 0;
}

.question-icon-mio {
  position: absolute;
  background-color: rgb(95, 155, 201);
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -24px;
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
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 32px;
  left: -39px;
  transform: rotate(45deg);
}

.question-icon-mio3 {
  position: absolute;
  background-color: #db1512;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 32px;
  left: -39px;
  transform: rotate(45deg);
}

.nota-container {
  font-size: 3em;
  position: relative;
}

.nota-container::before {
  content: "/ 10";
  position: absolute;
  top: 35px;
  right: -45px;
  font-size: 0.6em;
}

.color-red {
  color: #eb4034;
}

.color-green {
  color: #21ba45;
}

.com-container {
  margin-top: 50px;
  border-top: 2px solid #ebebeb;
  padding-top: 30px;
}

.com-1 {
  font-size: 1.25em;
  display: flex;
  align-items: center;
}

.com-2 {
  margin-top: 10px;
  font-size: 1em;
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

.reminder {
  font-size: 1.1em;
  margin-left: 18px;
}

.exam-bar {
  margin-top: 30px;
  border-top: 2px solid #ebebeb;
  padding-top: 30px;
}

.sin-contestar {
  color: rgba(1, 1, 1, 0.5);
}

@media (max-width: 1079px) {
  .pregunta-container {
    margin-right: 10px;
    margin-left: 20px;
  }
}

@media (max-width: 480px) {
  .respuesta-container {
    margin-left: 0 !important;
  }

  .question-icon-mio {
    width: 30px;
    height: 30px;
    top: -16px;
    left: -16px;
  }

  .question-icon-mio2,
  .question-icon-mio3 {
    width: 30px;
    height: 30px;
    top: 17px;
    left: -31px;
  }
}
</style>
