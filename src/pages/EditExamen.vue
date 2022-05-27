<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Modifica un examen</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Edita un examen ya existente para tus alumnos</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <!----------------------------->
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
    <div class="form-container">
      <div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="name">Título del examen</label>
              <input type="text" name="name" v-model="examen.titulo" />
            </div>
            <div style="width: fit-content">
              <label for="visible" class="visible-label"
                >Visible a los alumnos<input
                  class="cb"
                  name="visible"
                  id="visible"
                  v-model="examen.visible"
                  type="checkbox"
                />
              </label>
            </div>
            <div
              id="listaRecarga"
              v-for="(find, index) in examen.preguntas"
              :key="index"
              class="pregunta-container"
            >
              <div class="pregunta-title">
                <q-icon
                  class="icon-drawer no-margins2"
                  color="black"
                  name="fa-solid fa-question"
                />
                <div># Pregunta</div>
              </div>
              <input class="pregunta-input" v-model="find.pregunta" />
              <div
                v-for="(find2, index2) in find.respuesta"
                :key="index2"
                class="respuesta-container"
              >
                <div style="position: relative">
                  <div class="respuesta-title"># Respuesta</div>
                  <input
                    v-if="find.solucion == index2"
                    type="radio"
                    :id="'respuestas-' + index + '-' + index2"
                    :name="'respuestas' + index"
                    :value="index2"
                    checked
                    @change="onChange($event, index)"
                  />
                  <input
                    v-else
                    :id="'respuestas-' + index + '-' + index2"
                    type="radio"
                    :name="'respuestas' + index"
                    :value="index2"
                    @change="onChange($event, index)"
                  />
                  <input
                    class="res-in"
                    type="text"
                    v-model="
                      this.examen.preguntas[index].respuesta[index2].value
                    "
                  />
                  <q-avatar
                    v-if="Object.values(find.respuesta).length > 1"
                    style="cursor: pointer; font-size: 2em"
                    @click="eliminarRespuesta(index, index2)"
                    icon="fa-solid fa-trash-can"
                    color="negative"
                    text-color="white"
                    class="icon-trash"
                  />
                </div>
              </div>
              <div
                v-if="Object.values(find.respuesta).length < 5"
                class="btn-register3"
                @click="añadirRespuesta(index)"
              >
                <q-icon
                  class="icon-drawer no-margins"
                  color="white"
                  name="fa-solid fa-plus"
                />
                <div>Respuesta</div>
              </div>
              <div
                class="btn-register4"
                v-if="Object.values(this.examen.preguntas).length > 1"
                @click="eliminarPregunta(index)"
              >
                <q-icon
                  class="icon-drawer no-margins3"
                  color="white"
                  name="fa-solid fa-trash-can"
                />
              </div>
            </div>
            <div class="btn-register2" @click="añadirPregunta()">
              <q-icon
                class="icon-drawer no-margins"
                color="white"
                name="fa-solid fa-plus"
              />
              <div>Pregunta</div>
            </div>
            <div>
              <input
                class="btn-register"
                type="button"
                name="button"
                @click="updateExamen"
                value="Editar examen"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
    <!------------------------------->
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
      idcurso: "",
      idexamen: "",
      examen: {},
      show: true,
      isDisabled: true,
      defaultValues: {
        titulo: "",
        preguntas: [],
        visible: true,
      },
    };
  },
  setup() {
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
    onChange($event, indicePregunta) {
      var seleccionado = event.target.value;
      this.examen.preguntas[indicePregunta].solucion = seleccionado;
      console.log(this.examen.preguntas);
    },

    añadirPregunta() {
      console.log(this.examen.preguntas);
      this.examen.preguntas.push({ pregunta: "", respuesta: [], solucion: "" });
      var indice = Object.values(this.examen.preguntas).length - 1;
      this.examen.preguntas[indice].respuesta.push({ value: "" });
    },

    eliminarPregunta(indicePregunta) {
      if (indicePregunta != -1) {
        this.examen.preguntas.splice(indicePregunta, 1);
      }
    },

    añadirRespuesta(indicePregunta) {
      this.examen.preguntas[indicePregunta].respuesta.push({ value: "" });
    },

    eliminarRespuesta(indicePregunta, indiceRespuesta) {
      if (indiceRespuesta != -1) {
        this.examen.preguntas[indicePregunta].respuesta.splice(
          indiceRespuesta,
          1
        );
      }
      let resultado = this.examen.preguntas[indicePregunta].solucion;
      console.log(resultado);
      if (resultado > indiceRespuesta) {
        this.examen.preguntas[indicePregunta].solucion = resultado - 1;
        const $id = document.getElementById(
          "respuestas-" +
            indicePregunta +
            "-" +
            this.examen.preguntas[indicePregunta].solucion
        );
        $id.checked = true;
      } else if (resultado == indiceRespuesta) {
        console.log("pepe");
        this.examen.preguntas[indicePregunta].solucion = "";
        console.log(this.examen.preguntas[indicePregunta].solucion);

        for (
          let i = 0;
          i < this.examen.preguntas[indicePregunta].respuesta.length;
          i++
        ) {
          const $id = document.getElementById(
            "respuestas-" + indicePregunta + "-" + i
          );
          console.log($id);
          $id.selected = false;
        }
      }
      console.log(this.examen);
    },

    updateExamen() {
      let valuePreguntas = true;
      for (let i = 0; i < this.examen.preguntas.length; i++) {
        console.log(this.examen.preguntas[i]);
        if (this.examen.preguntas[i].pregunta == "") {
          valuePreguntas = false;
        } else if (this.examen.preguntas[i].solucion == "") {
          valuePreguntas = false;
        } else {
          for (let j = 0; j < this.examen.preguntas[i].respuesta.length; j++) {
            if (this.examen.preguntas[i].respuesta[j].value == "") {
              valuePreguntas = false;
            }
          }
        }
      }
      let valueVisible = "";
      if (this.examen.visible == true || this.examen.visible == false) {
        valueVisible = true;
      }
      console.log(
        this.examen.titulo +
          "-" +
          valuePreguntas +
          "-" +
          valueVisible +
          "-" +
          this.idexamen
      );
      if (
        this.examen.titulo != "" &&
        valuePreguntas != false &&
        valueVisible != false &&
        this.idexamen != ""
      ) {
        let data = {
          titulo: this.examen.titulo,
          preguntas: this.examen.preguntas,
          visible: this.examen.visible,
          idexamen: this.idexamen,
        };
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .put(
            "/curso/" + this.idcurso + "/examen/" + this.idexamen,
            data,
            config
          )
          .then((response) => {
            console.log("edit OK");
            this.$router.push("/curso/" + this.idcurso);
          })
          .catch(() => {
            console.log("edit MAL");
          });
      } else {
        this.registerError("No se ha podido editar el examen");
      }
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

    goBack() {
      this.$router.push("/curso/" + this.idcurso);
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
  },

  mounted() {
    this.checkUserLogged();
    this.idexamen = this.$router.currentRoute._value.params.idexamen;
    this.idcurso = this.$router.currentRoute._value.params.idcurso;
    this.loadExamen();
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

.visible-label {
  display: flex;
  align-items: center;
}

.cb {
  margin-left: 10px;
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
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

textarea {
  border: 0;
  outline: none;
  resize: none;
  border-bottom: 2px solid #226294;
}

.visible-label {
  display: flex;
  align-items: center;
}

.cb {
  margin-left: 10px;
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
}

.uploader {
  margin-top: 30px;
  width: 40%;
  min-width: 300px;
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
  margin-right: 25px;
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

.no-margins {
  margin: 0;
  margin-right: 6px;
  margin-top: 4px;
}

.pregunta-container {
  margin: 20px;
  margin-left: 40px;
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
}

.no-margins2 {
  margin: 0;
  margin-right: 6px;
}

.respuesta-container {
  margin: 10px 0;
  border: 2px solid #f5f5f5;
  margin-left: 40px;
  padding: 10px;
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

.btn-register3 {
  background-color: #05beed;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
}

.btn-register3:hover {
  background-color: #12ccfc;
}

.icon-trash {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.btn-register4 {
  background-color: #c10015;
  display: inline-block;
  padding: 12px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 15px;
}

.btn-register4:hover {
  background-color: #db0d24;
}

.no-margins3 {
  margin: 0;
}

@media (max-width: 1079px) {
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="number"],
  textarea {
    width: 90%;
  }

  .top-info {
    flex-direction: column;
  }

  .btn-addnew {
    margin-bottom: 50px;
    align-self: flex-start;
    margin-right: 0;
    margin-left: 25px;
  }
}

@media (max-width: 859px) {
  .pregunta-container {
    margin-left: 0;
  }

  .respuesta-container {
    margin-left: 10px;
  }

  .res-in {
    width: 80% !important;
  }
}

@media (max-width: 524px) {
  .res-in {
    width: 270px !important;
    min-width: 250px !important;
  }
}

@media (max-width: 480px) {
  .btn-addnew {
    margin-bottom: 75px;
  }

  .query-found {
    margin-bottom: 10px;
  }

  .pregunta-input,
  .res-in {
    min-width: 225px !important;
  }

  .res-in {
    min-width: 180px !important;
    width: 180px !important;
  }
}
</style>
