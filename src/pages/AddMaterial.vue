<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Añade material al curso</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Agrega material como enlaces, archivos o tareas a tu curso</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div class="form-container">
      <div>
        <form ref="form">
          <div>
            <label for="name">Nombre</label>
            <input type="text" name="name" v-model="material.name" />
          </div>
          <div>
            <label for="tipo">Tipo de material</label>
            <select
              name="tipo"
              v-model="material.type"
              @change="ocultarMostrar"
            >
              <option value="enlace">Enlace</option>
              <option value="archivo">Archivo</option>
              <option value="tarea">Tarea</option>
              <option value="bloque">Bloque</option>
            </select>
          </div>
          <div v-if="enlaceSelected">
            <label for="material">URL del enlace</label>
            <input v-model="material.data" name="material" type="text" />
          </div>
          <div v-if="archivoSelected">
            <q-uploader
              class="uploader"
              label="Archivo"
              auto-upload
              multiple="false"
              max-files="1"
              :factory="setFile"
              @rejected="onRejected"
            />
          </div>
          <div
            v-if="
              enlaceSelected ||
              archivoSelected ||
              tareaSelected ||
              bloqueSelected
            "
            style="width: fit-content"
          >
            <label for="visible" class="visible-label"
              >Visible a los alumnos<input
                class="cb"
                name="visible"
                id="visible"
                v-model="material.visible"
                type="checkbox"
              />
            </label>
          </div>

          <div
            v-if="
              !bloqueSelected &&
              (enlaceSelected || tareaSelected || archivoSelected)
            "
          >
            <label for="bloque">Bloque al que pertenece</label>
            <select name="bloque" v-model="material.bloque">
              <option
                v-for="(item, index) in bloques"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <div v-if="tareaSelected">
            <label for="description">Descripción de la tarea</label>
            <textarea
              style="width: 40%; min-width: 300px"
              rows="5"
              name="description"
              v-model="descripcion"
            ></textarea>
          </div>
          <div>
            <input
              class="btn-register"
              type="button"
              name="button"
              @click="submitForm"
              value="Añadir material"
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
import { ref } from "vue";

export default defineComponent({
  name: "AdminAddUser",
  data() {
    return {
      material: {
        name: "",
        type: "",
        data: "",
        visible: true,
        bloque: "",
      },
      id: "",
      file: ref(null),
      descripcion: "",
      options: [
        {
          label: "Enlace",
          value: "enlace",
        },
        {
          label: "Archivo",
          value: "archivo",
        },
        {
          label: "Tarea",
          value: "tarea",
        },
        {
          label: "Bloque",
          value: "bloque",
        },
      ],
      bloques: [
        {
          label: "",
          value: "",
        },
      ],
      enlaceSelected: false,
      archivoSelected: false,
      tareaSelected: false,
      bloqueSelected: false,
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
      this.$router.push("/curso/" + this.id);
    },
    submitForm() {
      console.log("type: ");
      console.log(this.material.type);
      if (
        this.material.name != "" &&
        this.material.type != "" &&
        //this.material.data != "" &&
        //this.material.visible != "" &&
        this.id != ""
      ) {
        console.log("asdf");
        let formData = new FormData();
        formData.append("nombre", this.material.name);
        formData.append("tipo", this.material.type);
        formData.append("visible", this.material.visible);
        formData.append("curso", this.id);
        formData.append("bloque", this.material.bloque);
        console.log("BLOQUE: ");
        console.log(this.material.bloque);
        if (this.material.type == "enlace") {
          formData.append("data", this.material.data);
        } else if (this.material.type == "archivo") {
          formData.append("file", this.file);
        } else if (this.material.type == "tarea") {
          formData.append("descripcion", this.descripcion);
        }
        const $q = useQuasar();
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .post("/material/store", formData, config)
          .then((response) => {
            this.$router.push("/curso/" + this.id);
          })
          .catch(() => {
            this.registerError("No se ha podido añadir el material");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },
    setFile(files) {
      console.log("a b c");
      console.log(files);
      this.file = files[0];
    },
    loadBloques() {
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/material/" + this.id + "/bloques", config)
        .then((response) => {
          console.log("get bloques");
          console.log(response.data);
          let bloques = response.data.bloques;

          for (var i in bloques) {
            console.log(bloques[i][1]);
            this.bloques.push({
              label: bloques[i][1].nombre,
              value: bloques[i][0],
            });
          }
        })
        .catch(() => {});
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
    ocultarMostrar(chg) {
      if (chg.target.value == "enlace") {
        this.enlaceSelected = true;
        this.archivoSelected = false;
        this.tareaSelected = false;
        this.bloqueSelected = false;
      } else if (chg.target.value == "archivo") {
        this.enlaceSelected = false;
        this.archivoSelected = true;
        this.tareaSelected = false;
        this.bloqueSelected = false;
      } else if (chg.target.value == "tarea") {
        this.enlaceSelected = false;
        this.archivoSelected = false;
        this.tareaSelected = true;
        this.bloqueSelected = false;
      } else if (chg.target.value == "bloque") {
        this.enlaceSelected = false;
        this.archivoSelected = false;
        this.tareaSelected = false;
        this.bloqueSelected = true;
      }
    },
  },

  mounted() {
    this.checkUserLogged();
    this.id = this.$router.currentRoute._value.params.id;
    this.loadBloques();
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

@media (max-width: 1079px) {
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="number"],
  textarea,
  select {
    width: 90% !important;
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

  .q-uploader {
    width: 90% !important;
  }
}
</style>
