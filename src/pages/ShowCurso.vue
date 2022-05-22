<template>
  <q-dialog
    v-model="openBorrarExamen"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="background-myblue text-white" style="width: 400px">
      <q-card-section>
        <div class="text-h6">
          Estás a punto de eliminar un examen del curso...
        </div>
      </q-card-section>

      <q-card-section style="font-size: 1.1em" class="q-pt-none">
        {{ this.nombreExam }}
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-white text-teal logoutModal-margins"
      >
        <div class="logout-btn-no" v-close-popup>Cancelar</div>
        <div class="logout-btn-yes" v-close-popup>Aceptar</div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-page class="auth-container">
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>{{ this.curso.nombre }}</div>
    </div>

    <div class="desc">
      {{ this.curso.descripcion }}
    </div>
    <div class="btns-curso">
      <div class="btns-curso-inner btnsci1 border-move">
        <div class="btn-addnew" @click="goAddMaterial">Añadir material</div>
        <div class="btn-addnew" @click="goAddExamen">Añadir examen</div>
      </div>
      <div class="btns-curso-inner">
        <div class="btn-addnew btn2" @click="goBack">Volver</div>
      </div>
    </div>
    <div class="btns-curso" style="margin-bottom: 40px; padding-left: 27px">
      <div class="btns-curso-inner btnsci1 border-move">
        <div class="brd"></div>
        <div class="btn-swap" @click="moveMats">Materiales</div>
        <div class="btn-swap" @click="moveExams">Exámenes</div>
      </div>
    </div>
    <div
      class="no-hay-mats-exams"
      v-if="this.curso.material == null && cursoSelected"
    >
      Aún no hay materiales en este curso...
    </div>
    <div
      v-if="this.curso.material != null"
      :class="
        cursoSelected ? 'curso-container d-block' : 'curso-container d-none'
      "
    >
      <div class="title-inside" v-if="this.curso.material != null">
        <q-icon
          class="icon-drawer"
          color="grey-8"
          name="fa-solid fa-database"
        />
        <div>Materiales</div>
      </div>
      <ListaIterable
        v-if="this.curso.material != null"
        :profesor="true"
        :material="this.curso.material"
        :cursoid="this.id"
        :uid="this.uid"
      />
      <div class="items-list">
        <h4>Examenes</h4>
        <q-list bordered>
          <q-item
            v-for="(item, index) in curso.examen"
            :key="index"
            clickable
            v-ripple
          >
            <q-item-section>
              <a @click="goExamen(index)">{{ item.titulo }}</a>
            </q-item-section>
            <q-item-section>
              <q-avatar
                style="cursor: pointer; font-size: 2em"
                @click="goEditExamen(index)"
                icon="fa-solid fa-pencil"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section
              class="novisibleaalumnos"
              v-if="item.visible === 'false' || item.visible == false"
            >
              <q-icon
                class="icon-drawer"
                color="grey-8"
                name="fa-solid fa-eye-slash"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div
      class="no-hay-mats-exams"
      v-if="this.curso.examen == null && !cursoSelected"
    >
      Aún no se ha publicado ningún examen en este curso...
    </div>
    <div
      v-if="this.curso.examen != null"
      :class="
        !cursoSelected ? 'curso-container d-block' : 'curso-container d-none'
      "
    >
      <div class="curso-container-i" v-if="this.curso.examen != null">
        <div class="title-inside">
          <q-icon class="icon-drawer" color="grey-8" name="fa-solid fa-paste" />
          <div>Exámenes</div>
        </div>
        <q-list class="exam-list">
          <q-item
            class="exam-item"
            v-for="(item, index) in curso.examen"
            :key="index"
          >
            <q-item-section>
              <p class="titulo-examen-inner">{{ item.titulo }}</p>
            </q-item-section>
            <q-item-section side class="btns-prof">
              <q-item-section>
                <q-avatar
                  style="cursor: pointer; font-size: 2em"
                  icon="fa-solid fa-pencil"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-avatar
                  style="cursor: pointer; font-size: 2em"
                  @click="
                    openBorrarExamen = true;
                    this.nombreExam = item.titulo;
                  "
                  icon="fa-solid fa-trash-can"
                  color="negative"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section
                class="novisibleaalumnos"
                v-if="item.visible === 'false' || item.visible == false"
              >
                <q-icon
                  style="font-size: 1.1em"
                  class="icon-drawer"
                  color="grey-8"
                  name="fa-solid fa-eye-slash"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import ListaIterable from "src/components/ListaIterable.vue";

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
      material: {},
      //server: "http://localhost:3000/public/",
      uid: "",
      cursoSelected: true,
      openBorrarExamen: false,
      nombreExam: "",
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
    moveMats() {
      this.cursoSelected = true;
      document.getElementsByClassName("brd")[0].style.left = "0";
    },
    moveExams() {
      this.cursoSelected = false;
      document.getElementsByClassName("brd")[0].style.left = "100px";
    },
    goBack() {
      this.$router.push("/curso/");
    },

    loadCurso() {
      let cursos;
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      console.log("token load curso");
      console.log(token);
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/" + this.id, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            cursos = response.data.curso;
            this.curso = cursos;
            console.log(this.curso);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    goAddMaterial() {
      this.$router.push("/curso/" + this.id + "/material/add");
    },
    goAddExamen() {
      this.$router.push("/curso/" + this.id + "/examen/add");
    },
    goEditExamen(index) {
      this.$router.push("/curso/" + this.id + "/examen/" + index);
    },
    goEdit(index) {
      this.$router.push("/curso/" + this.id + "/material/" + index + "/edit");
    },
    goExamen(index) {
      this.$router.push({
        path: "/curso/examen/" + this.id + "/" + index,
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
            this.uid = response.data.uid;
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
    this.id = this.$router.currentRoute._value.params.id;
    this.loadCurso();
  },
  components: { ListaIterable },
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

.desc {
  margin-top: 15px;
  padding: 20px 0;
  border-bottom: 2px solid #525252;
  padding-left: 20px;
  padding-right: 20px;
}

.btns-curso {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 25px;
}

.btnsci1 {
  display: flex;
}

.btn-addnew {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
}

.btn-addnew:hover {
  background-color: #30c954;
}

.btn2 {
  background-color: #05beed;
  color: black;
}

.btn2:hover {
  background-color: #12ccfc;
}

.curso-container {
  background-color: #f5f5f5;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: -20px;
  margin-top: 20px;
  padding: 25px;
}

.btn-swap {
  display: inline-block;
  padding: 10px;
  color: rgba(1, 1, 1, 0.7);
  cursor: pointer;
  font-size: 1.1em;
  width: 100px;
  height: fit-content;
}

.border-move {
  position: relative;
  height: fit-content;
}

.brd {
  position: absolute;
  width: 90px;
  bottom: 0;
  left: 0;
  border-bottom: 3px solid rgb(95, 155, 201);
  transition: 0.4s ease;
}

.d-block {
  display: block;
}

.d-none {
  display: none;
}

.title-inside {
  margin-bottom: 25px;
  font-size: 1.3em;
  display: flex;
  align-items: center;
}

.title-inside .q-icon {
  margin-right: 10px;
}

.no-hay-mats-exams {
  font-size: 1.1em;
  margin-top: 80px;
  margin-left: 30px;
}

.exam-list {
  border: 2px solid #e8e8e8;
  padding: 15px;
  padding-bottom: 40px;
  padding-top: 40px;
  margin: 5px 0;
}

.exam-item {
  border: 2px solid #e8e8e8;
  padding: 5px 15px;
  margin-top: 20px;
}

.exam-item:first-of-type {
  margin-top: 0 !important;
}

.titulo-examen-inner {
  margin: 0;
  cursor: pointer;
  width: fit-content;
}

.titulo-examen-inner:hover {
  text-decoration: underline;
}

.btns-prof {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  position: relative;
}

.btns-prof::before {
  content: "";
  position: absolute;
  height: calc(100% + 12px);
  width: 2px;
  background-color: #e8e8e8;
  left: -20px;
}

.btns-prof > div {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0 8px;
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

.novisibleaalumnos {
  position: absolute;
  top: -10px;
  right: 110px;
}
</style>
