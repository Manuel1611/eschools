<template>
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
        <div class="brd"></div>
        <div class="btn-swap" @click="moveMats">Materiales</div>
        <div class="btn-swap" @click="moveExams">Exámenes</div>
      </div>
      <div class="btns-curso-inner">
        <div class="btn-addnew btn2" @click="goBack">Volver</div>
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
        :material="this.curso.material"
        :cursoid="this.id"
      />
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
          <div
            v-for="(item, index) in curso.examen"
            :key="index"
            class="exam-item-1"
          >
            <q-item v-if="item.visible" class="exam-item" clickable v-ripple>
              <q-item-section>
                <a @click="goExamen(index, item)">{{ item.titulo }}</a>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

import ListaIterable from "../components/ListaIterable.vue";

export default defineComponent({
  components: { ListaIterable },
  lista: "hola,",
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
      cursoSelected: true,
      //server: "http://localhost:3000/public/",
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
    loadCurso() {
      let cursos;
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
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
    goBack() {
      this.$router.push("/curso/miscursos");
    },
    goExamen(id, examen) {
      console.log("go examen: " + id);
      console.log("/curso/miscursos/" + this.id + "/examen/" + id);
      this.$router.push("/curso/miscursos/" + this.id + "/examen/" + id);
      //this.$router.push("/curso/miscursos");
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
    this.id = this.$router.currentRoute._value.params.id;
    this.loadCurso();
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
  align-items: center;
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

.btns-curso-inner {
  margin-left: 30px;
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

.no-hay-mats-exams {
  font-size: 1.1em;
  margin-top: 50px;
  margin-left: 30px;
}

.exam-item-1 {
  margin-top: 20px;
}

.exam-item-1:first-of-type,
.exam-item-1:last-of-type {
  margin-top: 0;
}
</style>
