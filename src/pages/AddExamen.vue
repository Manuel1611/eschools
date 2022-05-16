<template>
  <q-page>
    <h3>Añadir Examen</h3>
    <div class="form-container">
      <div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Título del examen</label>
              <input type="text" name="titulo" v-model="examen.titulo" />
            </div>
            <div v-for="(find, index) in examen.preguntas" :key="index">
              <label>Pregunta</label>
              <input v-model="find.pregunta" />
              <input
                v-if="Object.values(find.respuesta).length < 5"
                class="form-btn"
                type="button"
                name="button"
                @click="añadirRespuesta(index)"
                value="Añadir respuesta"
              />
              <div v-for="(find2, index2) in find.respuesta" :key="index2">
                <input
                  type="radio"
                  :name="'respuestas' + index"
                  :value="index2"
                  @change="onChange($event, index)"
                />
                <input
                  type="text"
                  v-model="this.examen.preguntas[index].respuesta[index2].value"
                />
                <input
                  v-if="Object.values(find.respuesta).length > 1"
                  class="form-btn"
                  type="button"
                  name="button"
                  @click="eliminarRespuesta(index, index2)"
                  value="Eliminar respuesta"
                />
              </div>

              <input
                v-if="Object.values(this.examen.preguntas).length > 1"
                class="form-btn"
                type="button"
                name="button"
                @click="eliminarPregunta(index)"
                value="Eliminar Pregunta"
              />
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="añadirPregunta()"
                value="Añadir pregunta"
              />
            </div>
            <div>
              <label for="">Visible</label>
              <input v-model="examen.visible" type="checkbox" />
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Añadir examen"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="no-form-container">
      <p>E-Schools</p>
    </div>

    <div @click="goBack">Volver</div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AddExamen",
  data() {
    return {
      examen: {
        titulo: "",
        preguntas: [],
        visible: true,
      },
      id: "",
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
    goBack() {
      this.$router.push("/curso");
    },

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
    },

    submitForm() {
      if (
        this.examen.titulo != "" &&
        this.examen.preguntas != "" &&
        this.examen.visible != "" &&
        this.id != ""
      ) {
        let data = {
          titulo: this.examen.titulo,
          preguntas: this.examen.preguntas,
          visible: this.examen.visible,
          curso: this.id,
        };
        const $q = useQuasar();
        let token = $q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            'x-access-token' : token
          }
        }
        api
          .post("/examen/store", data, config)
          .then((response) => {
            //this.$router.push("/auth");
            this.registerOk("examen añadido");
          })
          .catch(() => {
            this.registerError("No se ha podido añadir el examen");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },
  },

  mounted() {
    this.id = this.$router.currentRoute._value.params.id;
  },
});
</script>

<style scoped></style>
