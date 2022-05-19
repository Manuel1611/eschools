<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Edita el material de un curso</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Modifica el material ya existente dentro de un curso</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div class="form-container">
      <div>
        <form ref="form">
          <div v-if="this.material.tipo != 'tarea'" class="estasapunto">
            <q-icon
              class="icon-drawer"
              color="black"
              name="fa-solid fa-angle-right"
            />
            <p>Estás a punto de modificar un {{ this.material.tipo }}...</p>
          </div>
          <div v-else class="estasapunto">
            <q-icon
              class="icon-drawer"
              color="black"
              name="fa-solid fa-angle-right"
            />
            <p>Estás a punto de modificar una {{ this.material.tipo }}...</p>
          </div>
          <div>
            <label for="name">Nombre</label>
            <input type="text" name="name" v-model="material.nombre" />
          </div>
          <div v-if="this.material.tipo == 'enlace'">
            <a target="_blank" :href="material.data" class="pinchaparaver"
              >Pincha aquí para acceder al enlace</a
            >
          </div>
          <div v-if="this.material.tipo == 'archivo'">
            <a
              target="_blank"
              :href="this.$serverapi + this.cursoid + '/' + material.file"
              class="pinchaparaver"
              >Pincha aquí para ver el archivo</a
            >
          </div>
          <div v-if="this.material.tipo == 'tarea'">
            <label for="description">Descripción de la tarea</label>
            <textarea
              style="width: 40%; min-width: 300px"
              rows="5"
              name="description"
              v-model="this.material.descripcion"
            ></textarea>
          </div>
          <div style="width: fit-content">
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
          <div>
            <input
              class="btn-register"
              type="button"
              name="button"
              @click="submitForm"
              value="Editar material"
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
      },
      cursoid: "",
      materialid: "",
      bloqueid: "",
      //server: "http://localhost:3000/public/",
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
      this.$router.push("/curso/" + this.cursoid);
    },

    submitForm() {
      let data;
      if (this.material.tipo == "tarea") {
        data = {
          nombre: this.material.nombre,
          visible: this.material.visible,
          descripcion: this.material.descripcion,
        };
      } else {
        data = {
          nombre: this.material.nombre,
          visible: this.material.visible,
        };
      }

      let url = "/material/" + this.cursoid + "/" + this.materialid;
      if (this.bloqueid != "") {
        url =
          "/material/" +
          this.cursoid +
          "/" +
          this.bloqueid +
          "/" +
          this.materialid;
      }

      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .put(url, data, config)
        .then((response) => {
          this.$router.push("/curso/" + this.cursoid);
        })
        .catch((error) => {
          console.log("erro de load material");
          console.log(error);
        });
    },

    loadMaterial() {
      let url = "/material/" + this.cursoid + "/" + this.materialid;
      if (this.bloqueid != "" && this.bloqueid != undefined) {
        url =
          "/material/" +
          this.cursoid +
          "/" +
          this.bloqueid +
          "/" +
          this.materialid;
      }
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get(url, config)
        .then((response) => {
          this.material = response.data.material;
        })
        .catch((error) => {
          console.log("erro de load material");
          console.log(error);
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
    console.log(this.$route.query.bloqueid);
    if (this.$route.query.bloqueid != "") {
      this.bloqueid = this.$route.query.bloqueid;
    }
    this.cursoid = this.$router.currentRoute._value.params.id;
    this.materialid = this.$router.currentRoute._value.params.idmaterial;
    this.loadMaterial();
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

.pinchaparaver {
  margin-top: 35px;
  margin-bottom: 10px;
  cursor: pointer;
  width: fit-content;
  color: black;
  text-decoration: none;
}

.pinchaparaver:hover {
  text-decoration: underline;
}

.estasapunto {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1em;
}

.estasapunto p {
  width: fit-content;
  margin: 0;
}
</style>
