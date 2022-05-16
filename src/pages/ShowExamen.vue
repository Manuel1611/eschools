<template>
  <q-page class="auth-container">
    <h3>Show Examen</h3>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
        v-model="this.examen.titulo"
      />
    </div>
    <div v-for="(find, index) in examen.preguntas" :key="index">
      <label>Pregunta</label>
      <input
        v-model="find.pregunta"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      />
      <input
        v-if="Object.values(find.respuesta).length < 5"
        class="form-btn"
        type="button"
        name="button"
        @click="añadirRespuesta(index)"
        value="Añadir respuesta"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      />
      <div v-for="(find2, index2) in find.respuesta" :key="index2">
        <input
          v-if="find.solucion == index2"
          type="radio"
          :name="'respuestas' + index"
          :value="index2"
          checked
          @change="onChange($event, index)"
          :class="this.show ? 'isShow' : 'isEdit'"
          :disabled="this.isDisabled"
        />
        <input
          v-else
          type="radio"
          :name="'respuestas' + index"
          :value="index2"
          @change="onChange($event, index)"
          :class="this.show ? 'isShow' : 'isEdit'"
          :disabled="this.isDisabled"
        />
        <input
          type="text"
          v-model="this.examen.preguntas[index].respuesta[index2].value"
          :class="this.show ? 'isShow' : 'isEdit'"
          :disabled="this.isDisabled"
        />
        <input
          v-if="Object.values(find.respuesta).length > 1"
          class="form-btn"
          type="button"
          name="button"
          @click="eliminarRespuesta(index, index2)"
          value="Eliminar respuesta"
          :class="this.show ? 'isShow' : 'isEdit'"
          :disabled="this.isDisabled"
        />
      </div>

      <input
        v-if="Object.values(this.examen.preguntas).length > 1"
        class="form-btn"
        type="button"
        name="button"
        @click="eliminarPregunta(index)"
        value="Eliminar Pregunta"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      />
    </div>
    <div>
      <input
        class="form-btn"
        type="button"
        name="button"
        @click="añadirPregunta()"
        value="Añadir pregunta"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      />
    </div>
    <div>
      <label for="">Visible</label>
      <input
        v-model="examen.visible"
        type="checkbox"
        :class="this.show ? 'isShow' : 'isEdit'"
        :disabled="this.isDisabled"
      />
    </div>
    <div class="btns-container">
      <span class="volverbtn display-block" @click="goBack">Volver</span>
      <br /><br />
      <span
        :class="!this.show ? 'editbtn display-none' : 'editbtn display-block'"
        @click="changeEditStyles"
        >Editar</span
      >
      <span
        :class="
          this.show ? 'cancelbtn display-none' : 'cancelbtn display-block'
        "
        @click="cancelEdit"
        >Cancelar</span
      >
      <span
        :class="this.show ? 'savebtn display-none' : 'savebtn display-block'"
        @click="updateExamen"
        >Guardar</span
      >
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
      idcurso: "-N06WwcGqQ7WhnMwaCP6",
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
    changeEditStyles() {
      this.defaultValues.titulo = this.examen.titulo;
      this.defaultValues.preguntas = this.examen.preguntas;
      this.defaultValues.visible = this.examen.visible;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    cancelEdit() {
      this.examen.titulo = this.defaultValues.titulo;
      this.examen.preguntas = this.defaultValues.preguntas;
      this.examen.visible = this.defaultValues.visible;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
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
    updateExamen() {
      let data = {
        titulo: this.examen.titulo,
        preguntas: this.examen.preguntas,
        visible: this.examen.visible,
        idexamen: this.idexamen,
      };
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .put("/curso/" + this.idcurso + "/examen/" + this.idexamen, data, config)
        .then((response) => {
          console.log("edit OK");
          this.show = !this.show;
          this.isDisabled = !this.isDisabled;
        })
        .catch(() => {
          console.log("edit MAL");
        });
    },
    loadExamen() {
      let examenes;
      console.log("/curso/" + this.idcurso + "/examen/" + this.idexamen);
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
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
      this.$router.push("/admin/cursos/");
    },
  },

  mounted() {
    this.idexamen = this.$router.currentRoute._value.params.idexamen;
    this.loadExamen();
  },
});
</script>

<style scoped>
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
