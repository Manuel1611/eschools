<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Añade nuevos cursos</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Crea nuevos cursos para la academia</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>

    <div class="form-container">
      <div>
        <form ref="form">
          <div>
            <label for="name">Nombre</label>
            <input type="text" name="name" v-model="curso.name" />
          </div>
          <div>
            <label for="price">Precio (€)</label>
            <input type="number" name="price" v-model="curso.price" />
          </div>
          <div>
            <label for="price">Id de Stripe</label>
            <input type="text" name="priceid" v-model="curso.priceid" />
          </div>
          <div>
            <label for="description">Descripción</label>
            <textarea
              style="width: 40%; min-width: 300px"
              rows="5"
              name="description"
              v-model="curso.description"
            ></textarea>
          </div>
          <div>
            <input
              class="btn-register"
              type="button"
              name="button"
              @click="submitForm"
              value="Registrar curso"
            />
          </div>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AdminAddUser",
  data() {
    return {
      curso: {
        name: "",
        description: "",
        price: "",
        priceid : "",
      },
      $q : '',
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
      this.$router.push("/admin/cursos");
    },

    submitForm() {
      if (
        this.curso.name != "" &&
        this.curso.description != "" &&
        this.curso.priceid != "" &&
        this.curso.price != ""
      ) {
        let data = {
          nombre: this.curso.name,
          descripcion: this.curso.description,
          precio: this.curso.price,
          priceid: this.curso.priceid,
        };
        const $q = useQuasar();

        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            'x-access-token' : token
          }
        }
        api
          .post("/curso/store", data, config)
          .then((response) => {
            this.registerOk("Curso añadido correctamente");
            this.curso.name = "";
            this.curso.description = "";
            this.curso.price = "";
            this.curso.priceid = "";
          })
          .catch(() => {
            this.registerError("No se ha podido añadir el curso");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },
  },

  mounted() {},
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

form > div {
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

textarea {
  border: 0;
  outline: none;
  resize: none;
  border-bottom: 2px solid #226294;
}
</style>
