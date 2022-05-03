<template>
  <q-page class="auth-container">
    <h3>Show Matriculas</h3>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.matricula.nombre"
        :disabled="this.isDisabled"
      />
    </div>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.matricula.precio"
        :disabled="this.isDisabled"
      />
    </div>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.matricula.descripcion"
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
        @click="updatematricula"
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
      id: "",
      matricula: {},
      show: true,
      isDisabled: true,
      defaultValues: {
        nombre: "",
        apellidos: "",
        rol: "",
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
      console.log("estoy");
      this.defaultValues.nombre = this.matricula.nombre;
      this.defaultValues.precio = this.matricula.precio;
      this.defaultValues.descripcion = this.matricula.descripcion;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    cancelEdit() {
      this.matricula.nombre = this.defaultValues.nombre;
      this.matricula.precio = this.defaultValues.precio;
      this.matricula.descripcion = this.defaultValues.descripcion;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    updatematricula() {
      let data = {
        nombre: this.matricula.nombre,
        precio: this.matricula.precio,
        descripcion: this.matricula.descripcion,
      };
      api
        .put("/matricula/" + this.id, data)
        .then((response) => {
          console.log("edit OK");
          this.show = !this.show;
          this.isDisabled = !this.isDisabled;
        })
        .catch(() => {
          console.log("edit MAL");
        });
    },
    loadmatricula() {
      let matriculas;
      api
        .get("/matricula/" + this.id)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            matriculas = response.data.matricula;
            this.matricula = matriculas;
            console.log(this.matricula);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    goBack() {
      this.$router.push("/admin/matriculas/");
    },
  },

  mounted() {
    this.id = this.$router.currentRoute._value.params.id;
    this.loadmatricula();
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
  matricular: pointer;
}

.editbtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
}

.cancelbtn {
  background-color: red;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
}

.savebtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  matricular: pointer;
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
  matricular: default !important;
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
  matricular: default !important;
  opacity: 1 !important;
  outline: none;
}

.isEditSelect {
  margin: 10px;
  border: 2px solid green;
  outline: none;
}
</style>
