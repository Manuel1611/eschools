<template>
  <q-page class="auth-container">
    <q-dialog
      v-model="openCalificarDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Calificar entrega de
            {{ this.calificacion.nombre + " " + this.calificacion.apellidos }}
          </div>
          <div>{{ this.calificacion.email }}</div>
        </q-card-section>

        <q-card-section
          style="font-size: 1.1em"
          class="input-container q-pt-none"
        >
          <label>Nota</label>
          <input
            class="input-nota"
            type="number"
            min="0"
            max="10"
            v-model="this.calificacion.nota"
          />
        </q-card-section>
        <q-card-section
          style="font-size: 1.1em"
          class="input-container q-pt-none"
        >
          <label>Comentario (opcional)</label>
          <textarea v-model="this.calificacion.comentario"></textarea>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div class="logout-btn-yes" @click="sendCalification()">Aceptar</div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="openCommentDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Comentario</div>
        </q-card-section>

        <q-card-section
          style="font-size: 1.1em"
          class="input-container q-pt-none"
        >
          {{ comment }}
        </q-card-section>
        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cerrar</div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>{{ this.tarea.nombre }}</div>
    </div>
    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>{{ this.tarea.descripcion }}</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <q-list class="list">
      <q-item v-for="(item, index) in this.entregas" :key="index" class="item">
        <div class="user-container">
          <div class="icon-user">
            <q-icon
              class="icon-drawer"
              color="grey-8"
              name="fa-solid fa-user"
            />
          </div>
          <div class="user-inner">
            <div style="font-size: 1.1em">
              {{ item[1].nombre + " " + item[1].apellidos }}
            </div>
            <div style="font-size: 1em">
              {{ item[1].email }}
            </div>
          </div>
          <div class="entrega-container">
            <a
              :href="
                this.$serverapi +
                '/usuarios/' +
                item[0] +
                '/' +
                idtarea +
                '/' +
                item[1].entrega[idtarea].file
              "
              target="_blank"
              >Ver entrega</a
            >
          </div>
        </div>

        <div class="div-calif-outer">
          <div
            class="div-calif"
            v-if="
              item[1].entrega[idtarea].nota != undefined &&
              item[1].entrega[idtarea].nota > -1
            "
          >
            <div class="nota-calif">
              <q-icon
                v-if="item[1].entrega[idtarea].comentario != ''"
                @click="
                  openCommentDialog = true;
                  comment = item[1].entrega[idtarea].comentario;
                "
                class="activate-bubble cursor-pointer"
                name="fa-solid fa-comment"
                color="white"
              />
              <q-icon
                v-else
                class="activate-bubble cursor-null"
                name="fa-solid fa-comment"
                color="white"
              />
              <span
                :class="
                  item[1].entrega[idtarea].nota < 5 ? 'suspenso' : 'aprobado'
                "
                >{{ item[1].entrega[idtarea].nota }}</span
              >
              / 10
            </div>
          </div>
          <div v-else>Tarea sin calificar</div>

          <div class="btn-evaluar" @click="calificarDialog(item[0], item[1])">
            Evaluar
          </div>
          <a
            class="ver-entrega-mq"
            :href="
              this.$serverapi +
              '/usuarios/' +
              item[0] +
              '/' +
              idtarea +
              '/' +
              item[1].entrega[idtarea].file
            "
            target="_blank"
            >Ver entrega</a
          >
        </div>
      </q-item>
    </q-list>
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
      entregas: {},
      idcurso: "",
      idtarea: "",
      //server: "http://localhost:3000/public/",
      openCalificarDialog: false,
      calificacion: {
        nombre: "",
        apellidos: "",
        email: "",
        id: "",
        nota: "",
        comentario: "",
      },
      bloqueid: "",
      tarea: {},
      openCommentDialog: false,
      comment: "",
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    goBack() {
      this.$router.push("/curso/" + this.idcurso);
    },
    loadEntregas() {
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/tarea/getTareasEntregadas/" + this.idtarea, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            this.entregas = response.data.usuarios;
          }
        });
    },

    loadTarea() {
      let url = "/material/" + this.idcurso + "/" + this.idtarea;
      if (this.bloqueid != "" && this.bloqueid != undefined) {
        console.log("change url" + this.bloqueid);
        url =
          "/material/" +
          this.idcurso +
          "/" +
          this.bloqueid +
          "/" +
          this.idtarea;
      }
      console.log("url: " + url);
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get(url, config)
        .then((response) => {
          console.log("todo ok");
          console.log(response);
          this.error = "";
          this.tarea = response.data.material;
        })
        .catch((error) => {
          console.log("erro de load material");
          console.log(error);
        });
    },

    calificarDialog(id, user) {
      this.calificacion.nombre = user.nombre;
      this.calificacion.apellidos = user.apellidos;
      this.calificacion.email = user.email;
      this.calificacion.id = id;
      this.calificacion.nota = "";
      this.calificacion.comentario = "";
      this.openCalificarDialog = true;
    },

    sendCalification() {
      if (this.calificacion.nota != "" && this.calificacion.nota != null) {
        console.log("Enviando calificacion al servidor");
        console.log(this.idcurso);
        let data = {
          idtarea: this.idtarea,
          iduser: this.calificacion.id,
          nota: this.calificacion.nota,
          comentario: this.calificacion.comentario,
          curso: this.idcurso,
        };
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .post("/tarea/calificarTarea/", data, config)
          .then((response) => {
            console.log("conexion correcta");
            if (response.status == 200) {
              console.log("conexion correcta2");
              console.log(response.data);
              this.openCalificarDialog = false;
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log("error calificando");
            console.log(error);
          });
      }
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
    if (this.$route.query.bloqueid != "") {
      console.log(" a v c");
      console.log(this.$route);
      this.bloqueid = this.$route.query.bloqueid;
    }
    this.idtarea = this.$router.currentRoute._value.params.idtarea;
    this.idcurso = this.$router.currentRoute._value.params.idcurso;
    this.loadEntregas();
    this.loadTarea();
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

.each-item {
  margin: 25px 0;
  padding: 16px 0;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 40px;
}

.background-myblue {
  background-color: #226294;
}

.logoutModal-margins {
  margin: 20px 0;
  border-radius: 0 !important;
  padding: 0;
}

.logout-btn-no,
.logout-btn-yes {
  margin: 0 !important;
  width: 100px;
  text-align: center;
  color: white;
  cursor: pointer;
  padding: 10px 0;
  font-size: 1.1em;
}

.logout-btn-no {
  background-color: #d42c2c;
  transition: 0.2s ease;
}

.logout-btn-yes {
  background-color: #21ba45;
  transition: 0.2s ease;
}

.logout-btn-no:hover {
  background-color: #f24141;
}

.logout-btn-yes:hover {
  background-color: #30c954;
}

.activate-bubble {
  cursor: pointer;
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
  font-size: 1.1em;
  color: white;
  display: flex;
  align-items: center;
}

.search-input {
  margin-right: 20px;
  padding: 10px 5px;
  width: 250px;
  outline: none;
  border: 0;
  font-size: 1.1em;
  border-radius: 3px;
}

.precio-container {
  width: 160px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #c92804;
  position: relative;
}

.precio-container::before {
  content: "";
  position: absolute;
  left: 10px;
  bottom: -10px;
  width: 15px;
  height: 2px;
  background-color: #c92804;
}

.list {
  margin-top: 30px;
}

.item {
  margin-top: 25px;
  padding-bottom: 30px;
  border-bottom: 2px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.user-container {
  display: flex;
  align-items: center;
}

.icon-user {
  margin-right: 15px;
}

.icon-user i {
  font-size: 1.5em;
}

.entrega-container {
  position: relative;
  margin-left: 50px;
}

.entrega-container:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100px;
  background-color: #f5f5f5;
  top: -33px;
  left: -20px;
}

.entrega-container a {
  text-decoration: none;
  color: black;
}

.entrega-container a:hover {
  text-decoration: underline;
}

.btn-evaluar {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
  min-width: 90px;
  text-align: center;
}

.btn-evaluar:hover {
  background-color: #30c954;
}

.input-container {
  display: flex;
  flex-direction: column;
}

textarea {
  resize: none;
  border: 0;
  outline: none;
  padding: 5px;
  margin-top: 5px;
}

.input-nota {
  border: 0;
  outline: none;
  padding: 5px;
  margin-top: 5px;
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

.user-inner {
  width: 275px;
}

.nota-calif {
  font-size: 1.3em;
}

.suspenso {
  color: #eb4034;
}

.aprobado {
  color: #21ba45;
}

.activate-bubble {
  margin-right: 10px;
  font-size: 0.65em;
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #03b1fc;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-null {
  cursor: not-allowed;
}

.div-calif-outer {
  display: flex;
  align-items: center;
}

.btn-evaluar {
  margin-left: 20px;
}

.ver-entrega-mq {
  display: none;
}

@media (max-width: 1079px) {
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="number"],
  textarea,
  .q-uploader {
    width: 90%;
  }

  .div-calif-outer {
    flex-direction: column;
  }

  .btn-evaluar {
    margin-left: 10px;
  }

  .btn-evaluar {
    margin-top: 10px;
  }

  .top-info {
    flex-direction: column;
  }

  .query-found {
    margin-bottom: 13px;
  }

  .btn-addnew {
    margin-bottom: 70px;
    align-self: flex-start;
    margin-right: 0;
    margin-left: 25px;
  }

  .entrega-container {
    display: none;
  }

  .ver-entrega-mq {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    color: black;
  }

  .ver-entrega-mq:hover {
    text-decoration: underline;
  }
}

@media (max-width: 480px) {
  .btn-addnew {
    margin-bottom: 85px;
  }

  .query-found {
    margin-bottom: 15px;
  }

  .item {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-container {
    margin-bottom: 20px;
  }
}
</style>
