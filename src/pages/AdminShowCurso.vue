<template>
  <q-page class="auth-container">
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>{{ this.nombreDelCurso }}</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Mira o modifica los cursos existentes de la academia</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>

    <div class="form-container">
      <div>
        <label for="name">Nombre</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="name"
            v-model="this.curso.nombre"
            :disabled="this.isDisabled"
          />
        </div>
      </div>
      <div>
        <label for="price">Precio</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            v-if="this.show"
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="price"
            v-model="this.cursoConEuro"
            :disabled="this.isDisabled"
          />
          <input
            v-else
            type="number"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="price"
            v-model="this.curso.precio"
            :disabled="this.isDisabled"
          />
        </div>
      </div>
      <div>
        <label for="desc">Descripción</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            v-if="this.show"
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="desc"
            v-model="this.curso.descripcion"
            :disabled="this.isDisabled"
          />
          <textarea
            v-else
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="desc"
            style="width: 40%; min-width: 300px"
            rows="5"
            v-model="this.curso.descripcion"
            :disabled="this.isDisabled"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="btns-container">
      <div>
        <input
          :class="
            !this.show
              ? 'btn-register display-none'
              : 'btn-register display-block'
          "
          type="button"
          name="button"
          @click="changeEditStyles"
          value="Editar"
        />
      </div>
      <div style="display: flex">
        <div>
          <input
            :class="
              this.show
                ? 'btn-register3 display-none'
                : 'btn-register3 display-block'
            "
            type="button"
            name="button"
            @click="cancelEdit"
            value="Cancelar"
          />
        </div>
        <div>
          <input
            :class="
              this.show
                ? 'btn-register display-none'
                : 'btn-register display-block'
            "
            type="button"
            name="button"
            @click="updateCurso"
            value="Guardar"
          />
        </div>
      </div>
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
      curso: {},
      show: true,
      isDisabled: true,
      defaultValues: {
        nombre: "",
        apellidos: "",
        rol: "",
      },
      nombreDelCurso: "",
      cursoConEuro: "",
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
      this.defaultValues.nombre = this.curso.nombre;
      this.defaultValues.precio = this.curso.precio;
      this.defaultValues.descripcion = this.curso.descripcion;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    cancelEdit() {
      this.curso.nombre = this.defaultValues.nombre;
      this.curso.precio = this.defaultValues.precio;
      this.curso.descripcion = this.defaultValues.descripcion;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    updateCurso() {
      let data = {
        nombre: this.curso.nombre,
        precio: this.curso.precio,
        descripcion: this.curso.descripcion,
      };
      api
        .put("/curso/" + this.id, data)
        .then((response) => {
          console.log("edit OK");
          this.show = !this.show;
          this.isDisabled = !this.isDisabled;
          this.nombreDelCurso = data.nombre;
          this.cursoConEuro = data.precio + " €";
          console.log(this.cursoConEuro);
        })
        .catch(() => {
          console.log("edit MAL");
        });
    },
    loadCurso() {
      let cursos;
      api
        .get("/curso/" + this.id)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            cursos = response.data.curso;
            this.curso = cursos;
            console.log("bbbb" + this.curso);
            this.nombreDelCurso = this.curso.nombre;
            console.log("cccc" + this.nombreDelCurso);
            this.cursoConEuro = this.curso.precio + " €";
            console.log(this.cursoConEuro);
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
    this.id = this.$router.currentRoute._value.params.id;
    this.loadCurso();
    console.log("aaaa" + this.nombreDelCurso);
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
.form-container {
  margin-top: 50px;
}

.form-container > div {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="number"] {
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

.btn-register3 {
  background-color: #c92804;
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

.btn-register3:hover {
  background-color: #d92b04;
}

.remove-opacity {
  background-color: transparent;
  opacity: 1 !important;
  cursor: default !important;
  border-bottom: 2px solid transparent !important;
  position: relative;
  color: black;
}

.ml {
  margin-left: -15px;
}

.display-none {
  display: none !important;
}

.display-block {
  display: inline-block !important;
}

.form-container > div {
  display: flex;
  flex-direction: column;
}

textarea {
  border: 0;
  outline: none;
  resize: none;
  border-bottom: 2px solid #226294;
}
</style>
