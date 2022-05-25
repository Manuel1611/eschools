<template>
  <q-page class="auth-container">
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
        <div v-if="this.entregada == 'false' || this.entregada == false">
          Sube tu tarea en un único archivo
        </div>
        <div v-else>{{ this.tarea.descripcion }}</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>
    <div class="items-list">
      <q-section v-if="this.entregada == 'true' || this.entregada == true">
        <p class="yahasentregado">
          Ya has entregado esta tarea
          <a
            :href="
              this.$serverapi +
              '/usuarios/' +
              this.userid +
              '/' +
              this.tareaid +
              '/' +
              this.fileName
            "
            target="_blank"
            class="ver-archivo"
            >(ver archivo adjunto)</a
          >
        </p>
        <q-section v-if="this.nota < 0">
          <div class="esperando">
            Esperando calificación<span class="puntos-suspensivos">....</span>
          </div>
        </q-section>
        <q-section v-else>
          <span class="nota-container"
            ><span :class="this.nota < 5 ? 'color-red' : 'color-green'">{{
              this.nota
            }}</span></span
          >
          <div class="com-container">
            <div v-if="this.comentario != ''">
              <div class="com-1">
                <q-icon
                  class="comment-icon icon-drawer"
                  color="grey-8"
                  name="fa-solid fa-comment"
                />Tu profesor dice...
              </div>
              <div class="com-2">"{{ this.comentario }}"</div>
            </div>
            <div v-else>
              <div class="com-1">
                <q-icon
                  class="comment-icon icon-drawer"
                  color="grey-8"
                  name="fa-solid fa-comment"
                />No hay comentarios...
              </div>
            </div>
          </div>
        </q-section>
      </q-section>
      <q-section v-else>
        <div class="uploader-title">{{ this.tarea.descripcion }}</div>
        <q-uploader
          class="uploader"
          label="Archivo"
          auto-upload
          multiple="false"
          max-files="1"
          :factory="setFile"
          @rejected="onRejected"
        />
      </q-section>
    </div>

    <div class="btns-container">
      <div
        v-if="this.entregada == 'false' || this.entregada == false"
        class="btn-addnew2"
        style="margin-left: 20px"
        @click="submitForm"
      >
        Enviar tarea
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
      cursoid: "",
      tareaid: "",
      tarea: {},
      file: "",
      //server: "http://localhost:3000/public/",
      error: "no carga",
      bloqueid: "",
      userid: "",
      entregada: false,
      nota: -1,
      comentario: "",
      fileName: "",
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
      let url = "/material/" + this.cursoid + "/" + this.tareaid;
      if (this.bloqueid != "" && this.bloqueid != undefined) {
        console.log("change url" + this.bloqueid);
        url =
          "/material/" +
          this.cursoid +
          "/" +
          this.bloqueid +
          "/" +
          this.tareaid;
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
          this.error = "";
          this.tarea = response.data.material;
        })
        .catch((error) => {
          console.log("erro de load material");
          console.log(error);
        });
    },

    checkEntregada() {
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      console.log("checkiing entregada" + this.userid);
      api
        .get(
          "/material/checkuploadedtarea/" + this.userid + "/" + this.tareaid,
          config
        )
        .then((response) => {
          if (response.status == 200) {
            console.log("checkentregada");
            console.log(response);
            this.entregada = response.data.entregada;
            this.nota = response.data.nota;
            this.comentario = response.data.comentario;
            this.fileName = response.data.filename;
          }
        })
        .catch((error) => {
          console.log("erro de check entregada.");
          console.log(error);
        });
    },

    goBack() {
      this.$router.push("/curso/miscursos/" + this.cursoid);
    },
    submitForm() {
      if (this.file != "") {
        let formData = new FormData();
        formData.append("userid", this.userid);
        formData.append("tarea", this.tareaid);
        formData.append("entrega", this.file);
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .post("/tarea/uploadTarea", formData, config)
          .then((response) => {
            if (response.status == 200) {
              console.log("Subida la tarea");
              console.log(response);
              window.location.reload();
            } else {
              console.log("NO SE HA SUBIDO");
              this.emailError("No se ha podido subir el archivo");
            }
          })
          .catch((error) => {
            console.log("erro de load material");
            console.log(error);
            this.emailError("No se ha podido subir el archivo");
          });
      } else {
        this.emailError("Selecciona un archivo a subir");
      }
    },
    setFile(files) {
      console.log("a b c");
      console.log(files);
      //console.log(e)
      this.file = files[0];
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
            console.log(response.data.uid);
            this.userid = response.data.uid;
            this.checkEntregada();
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
    this.cursoid = this.$router.currentRoute._value.params.id;
    this.tareaid = this.$router.currentRoute._value.params.idtarea;
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

.yahasentregado {
  margin-top: 30px;
  font-size: 1.1em;
}

.nota-container {
  font-size: 3em;
  position: relative;
}

.nota-container::before {
  content: "/ 10";
  position: absolute;
  top: 35px;
  right: -45px;
  font-size: 0.6em;
}

.color-red {
  color: #eb4034;
}

.color-green {
  color: #21ba45;
}

.com-container {
  margin-top: 50px;
  border-top: 2px solid #ebebeb;
  padding-top: 30px;
}

.com-1 {
  font-size: 1.25em;
  display: flex;
  align-items: center;
}

.com-2 {
  margin-top: 10px;
  font-size: 1em;
}

.ver-archivo {
  color: black;
  text-decoration: none;
}

.ver-archivo:hover {
  text-decoration: underline;
}

.comment-icon {
  font-size: 1em;
  margin-right: 10px;
}

.uploader {
  width: 40%;
  min-width: 300px;
  margin-top: 30px;
}

.btn-addnew2 {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  margin-left: 0 !important;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
}

.btn-addnew2:hover {
  background-color: #30c954;
}

.uploader-title {
  margin-top: 30px;
  font-size: 1.1em;
  border-bottom: 2px solid #ebebeb;
  padding-bottom: 30px;
}

.esperando {
  margin-top: 30px;
  border-top: 2px solid #ebebeb;
  padding-top: 30px;
  font-size: 1.5em;
}

.puntos-suspensivos {
  position: relative;
}

.puntos-suspensivos::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  top: 0;
  left: 0;
  animation: animate-dots 2.5s steps(4) forwards infinite;
}

@keyframes animate-dots {
  to {
    left: 100%;
  }
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
}
</style>
