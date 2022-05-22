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
    <div v-if="this.haciendo == 'false' || this.haciendo == false">
      <div class="top-info">
        <div class="query-found">
          <q-icon
            class="icon-drawer"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <div v-if="this.realizado == 'false' || this.realizado == false">
            No has realizado todavía el examen. Pulsa el botón para realizarlo
          </div>
          <div v-else>{{ this.examen.descripcion }}</div>
        </div>
      </div>
      <div class="items-list">
        <q-section v-if="this.realizado == 'true' || this.realizado == true">
          <p class="yahasentregado">Ya has entregado este examen</p>
          <q-section>
            <span class="nota-container"
              ><span :class="this.nota < 5 ? 'color-red' : 'color-green'">{{
                this.nota
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
                  />No hay comentarios...
                </div>
              </div>
              <div
                class="btn-addnew2"
                style="margin-left: 20px"
                @click="mostrarExamen"
              >
                Ver examen
              </div>

              <div v-if="this.mostrar == 'true' || this.mostrar == true">
                <div v-for="(find, index) in examen.preguntas" :key="index">
                  <label>Pregunta</label>
                  <input v-model="find.pregunta" disabled />
                  <div v-for="(find2, index2) in find.respuesta" :key="index2">
                    <input
                      v-if="
                        find.solucion ==
                          this.examenNuevo.preguntasNuevas[index].solucion &&
                        find.solucion == index2
                      "
                      type="radio"
                      :name="'respuestas' + index"
                      :value="index2"
                      class="azul"
                      @change="onChange($event, index, index2)"
                    />
                    <input
                      v-else-if="find.solucion == index2"
                      type="radio"
                      :name="'respuestas' + index"
                      :value="index2"
                      class="verde"
                      @change="onChange($event, index, index2)"
                    />
                    <input
                      v-else-if="
                        this.examenNuevo.preguntasNuevas[index].solucion ==
                        index2
                      "
                      type="radio"
                      :name="'respuestas' + index"
                      :value="index2"
                      class="rojo"
                      @change="onChange($event, index, index2)"
                    />
                    <input
                      v-else
                      type="radio"
                      :name="'respuestas' + index"
                      :value="index2"
                      @change="onChange($event, index, index2)"
                    />
                    <input
                      type="text"
                      v-model="
                        this.examen.preguntas[index].respuesta[index2].value
                      "
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-section>
        </q-section>
        <q-section v-else>
          <div
            v-if="this.realizado == 'false' || this.realizado == false"
            class="btn-addnew2"
            style="margin-left: 20px"
            @click="realizarExamen"
          >
            Realizar examen
          </div>
        </q-section>

        <div class="btn-addnew" @click="goBack">Volver</div>
      </div>
    </div>
    <div v-else>
      <q-section>
        <div v-for="(find, index) in examen.preguntas" :key="index">
          <label>Pregunta</label>
          <input v-model="find.pregunta" disabled />
          <div v-for="(find2, index2) in find.respuesta" :key="index2">
            <input
              type="radio"
              :name="'respuestas' + index"
              :value="index2"
              @change="onChange($event, index, index2)"
            />
            <input
              type="text"
              v-model="this.examen.preguntas[index].respuesta[index2].value"
              disabled
            />
          </div>
        </div>
        <div class="btn-addnew2" style="margin-left: 20px" @click="submitForm">
          Enviar examen
        </div>
      </q-section>
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
      cursoid: "",
      examenid: "",
      userid: "",
      examen: {},
      examenNuevo: {},
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
            if (examen == "" || examen == undefined) {
              this.examenNuevo = JSON.parse(JSON.stringify(examen2));
              console.log(this.examenNuevo.preguntas.length);
              for (let i = 0; i < this.examenNuevo.preguntas.length; i++) {
                this.examenNuevo.preguntas[i].respuesta = "";
                this.examenNuevo.preguntas[i].solucion = -1;
              }
            }
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });

      console.log("original");
      console.log(this.examen);
      console.log("nuevo");
      console.log(this.examenNuevo);
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

    onChange($event, indicePregunta, indiceRespuesta) {
      var seleccionado = event.target.value;
      this.examenNuevo.preguntas[indicePregunta].solucion = seleccionado;
      this.examenNuevo.preguntas[indicePregunta].respuesta =
        this.examen.preguntas[indicePregunta].respuesta[indiceRespuesta].value;
    },

    submitForm() {
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
          console.log("erro de load examen");
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
.verde:after {
  background-color: green;
  border: 1px solid green;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  content: "";
}
.azul:after {
  background-color: blue;
  border: 1px solid blue;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  content: "";
}
.rojo:after {
  background-color: red;
  border: 1px solid red;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  content: "";
}
.btns-container {
  margin-top: 10px;
}
.volverbtn {
  background-color: #1c5785;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
}

.editbtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
}

.cancelbtn {
  background-color: red;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
}

.savebtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
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
  cursor: default !important;
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
  cursor: default !important;
  opacity: 1 !important;
  outline: none;
}

.isEditSelect {
  margin: 10px;
  border: 2px solid green;
  outline: none;
}
</style>
