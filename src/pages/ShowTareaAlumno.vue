<template>
  <q-page class="auth-container">
    <h3>Tarea</h3>
    <div class="items-list">
      <h4>{{ this.tarea.nombre}}</h4>
      <h5>{{ this.tarea.descripcion}}</h5>

      <q-uploader
        style=""
        label="Documento"
        auto-upload
        multiple="false"
        max-files="1"
        :factory="setFile"
        @rejected="onRejected"
      />

    </div>

    <div class="btns-container">
      <span class="volverbtn display-block" @click="goBack">Volver</span>
      <span class="volverbtn display-block" style="margin-left:20px" @click="submitForm">Subir tarea</span>
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
      id: "",
      tareaid: "",
      tarea : {},
      file : '',
      server : 'http://localhost:3000/public/'
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
    loadTarea() {
      api
        .get("/material/"+ this.id +"/" + this.tareaid)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            this.tarea = response.data.material;
            console.log(this.tarea);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    goBack() {
      this.$router.push("/curso/miscursos/"+ this.id);
    },

    submitForm(){
      if(this.file != ''){
        let formData = new FormData()
        //formData.append('nombre', this.material.name);
      }

    },
    setFile(files){
      console.log('a b c')
      console.log(files)
      //console.log(e)
      this.file = files[0]
    },

  },

  mounted() {
    this.id = this.$router.currentRoute._value.params.id;
    this.tareaid = this.$router.currentRoute._value.params.idtarea;
    this.loadTarea();
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
