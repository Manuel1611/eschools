<template>
  <q-page class="auth-container">
    <q-dialog
      v-model="openBajaDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">¿Quieres dar de baja a...?</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          {{ correoBajaAlta }}
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="darBaja(idBajaAlta)"
          >
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="openAltaDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">¿Quieres dar de alta a...?</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          {{ correoBajaAlta }}
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="darAlta(idBajaAlta)"
          >
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="openAddDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Invitar profesor</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          Escribe el correo electrónico de la persona a la que quieres invitar
        </q-card-section>
        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          <input class="input-invitarprof" type="text" v-model="invitedUser" />
        </q-card-section>
        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" @click="invitedUser = ''" v-close-popup>
            Cancelar
          </div>
          <div
            :class="
              invitedUser == '' ? 'logout-btn-yes-disabled' : 'logout-btn-yes'
            "
            @click="
              invitarUsuario(idBajaAlta);
              invitedUser = '';
            "
          >
            Invitar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="openAddCursoProfesor"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Asigna un curso a...</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          {{ nombreParaCurso }}<br />
          {{ correoParaCurso }}
        </q-card-section>

        <q-card-section class="q-pt-none">
          <select
            class="selectCurso"
            required
            v-model="matricula.curso"
            name="curso"
          >
            <option value="" selected disabled></option>
            <option
              v-for="(item, index) in courses"
              :key="index"
              :value="item[0]"
            >
              {{ item[1].nombre }}
            </option>
          </select>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div
            class="logout-btn-no"
            v-close-popup
            @click="cancelAddCursoDialog"
          >
            Cancelar
          </div>
          <div
            :class="
              matricula.curso == ''
                ? 'logout-btn-yes-disabled'
                : 'logout-btn-yes'
            "
            @click="sendAddCursoProfesor(idProfesorParaCurso, nombreProfesor)"
          >
            Asignar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="title">
      <div style="display: flex; align-items: center">
        <q-icon
          class="icon-drawer"
          color="black"
          name="fa-solid fa-angle-right"
        />
        <div>Profesores en E-Schools</div>
      </div>
      <div class="invitarprof-btn" @click="openAddDialog = true">
        Invitar profesor
      </div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon class="icon-drawer" color="white" name="fa-solid fa-hashtag" />
        <div>{{ this.users.length }} resultados</div>
      </div>
      <div class="btn-addnew" @click="goAddUser">Añadir nuevo</div>
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          v-model="search"
          placeholder="Buscar..."
        />
      </div>
    </div>

    <q-list>
      <q-item
        class="each-item"
        v-for="(item, index) in filteredUsers"
        :key="index"
      >
        <q-item-section avatar top>
          <q-avatar
            style="cursor: pointer"
            v-if="item[1].activo"
            @click="
              openBajaDialog = true;
              correoBajaAlta = item[1].email;
              idBajaAlta = item[0];
            "
            icon="fa-solid fa-arrow-down"
            color="negative"
            text-color="white"
          />
          <q-avatar
            style="cursor: pointer"
            v-else
            @click="
              openAltaDialog = true;
              correoBajaAlta = item[1].email;
              idBajaAlta = item[0];
            "
            icon="fa-solid fa-arrow-up"
            color="positive"
            text-color="white"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" style="font-size: 1.1em">{{
            item[1].nombre + " " + item[1].apellidos
          }}</q-item-label>
          <q-item-label style="font-size: 1em" caption>{{
            item[1].email
          }}</q-item-label>

          <q-item-label
            class="cursosParaProfesores"
            v-if="item[1].cursos != null"
            style="font-size: 1em"
            caption
          >
            <div class="cursos-prof-container">
              <q-icon
                class="icon-drawer"
                color="black"
                name="fa-solid fa-angle-right"
              />Cursos:
              <p>
                <q-list class="listaCursos">
                  <q-item-label
                    v-for="(item2, index2) in item[1].cursos"
                    :key="index2"
                    style="font-size: 1em"
                    caption
                  >
                    {{ loadCourseName(item2.curso) }}
                  </q-item-label>
                </q-list>
              </p>
            </div>
          </q-item-label>
          <q-item-label
            class="cursosParaProfesores"
            v-else
            style="font-size: 1em"
            caption
          >
            <q-icon
              class="icon-drawer"
              color="black"
              name="fa-solid fa-angle-right"
            />
            <p>En ningún curso todavía...</p>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon class="activate-bubble" name="info" color="green" />
          <div v-if="item[1].activo" class="bubble">Activo</div>
          <div v-else class="bubble">Inactivo</div>
        </q-item-section>

        <q-item-section side>
          <q-avatar
            style="cursor: pointer"
            icon="fa-solid fa-folder-plus"
            color="info"
            @click="
              openAddCursoProfesor = true;
              correoParaCurso = item[1].email;
              nombreParaCurso = item[1].nombre + ' ' + item[1].apellidos;
              idProfesorParaCurso = item[0];
              nombreProfesor = item[1].nombre;
            "
            text-color="white"
          />
        </q-item-section>
        <q-item-section side>
          <q-avatar
            style="cursor: pointer"
            @click="goUser(item[0])"
            icon="fa-solid fa-pencil"
            color="primary"
            text-color="white"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-if="users.length > 8"
        v-model="page"
        :min="currentPage"
        :max="Math.ceil(users.length / totalPages)"
        :max-pages="3"
        boundary-numbers
        direction-links
      >
      </q-pagination>
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
      openBajaDialog: false,
      openAltaDialog: false,
      correoBajaAlta: "",
      idBajaAlta: "",
      openAddCursoProfesor: false,
      correoParaCurso: "",
      nombreParaCurso: "",
      idProfesorParaCurso: "",
      nombreProfesor: "",
      users: {},
      matricula: {
        curso: "",
      },
      courses: {},
      search: "",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 8,
      openAddDialog: false,
      invitedUser: "",
    };
  },
  setup() {
    const $q = useQuasar();

    return {
      cursoAddedToProfesor(msg) {
        $q.notify({
          message: msg,
          color: "green",
          badgeStyle: "opacity: 0",
        });
      },
    };
  },
  methods: {
    loadCourseName(id) {
      for (var i in this.courses) {
        if (this.courses[i][0] == id) {
          return this.courses[i][1].nombre;
        }
      }
      return "kekw";
    },
    loadUsers() {
      let users;
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/user/profesores", config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data.usuarios);
            console.log("aaa" + users);
            users = response.data.usuarios;
            console.log("bbb" + users);
            this.users = users;
            console.log(this.users);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    loadCourses() {
      let cursos;
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/curso/index", config)
        .then((response) => {
          console.log("conexion correcta cursos");
          if (response.status == 200) {
            cursos = response.data.cursos;
            this.courses = cursos;
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    cancelAddCursoDialog() {
      this.matricula.curso = "";
    },
    sendAddCursoProfesor(idprofesor, nombreProf) {
      if (this.matricula.curso == "") {
        this.openAddCursoProfesor = true;
      } else {
        this.openAddCursoProfesor = false;
        let data = {
          profesorId: idprofesor,
          cursoId: this.matricula.curso,
        };
        const $q = useQuasar();
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .post("/user/addcursotoprofesor", data, config)
          .then((response) => {
            console.log(response);
            this.cursoAddedToProfesor(
              "Se le ha asignado el curso al profesor " + nombreProf
            );
          })
          .catch((e) => {
            console.log(e);
          });

        this.matricula.curso = "";
      }
    },
    darBaja(id) {
      let data = {
        userid: id,
      };
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .post("/user/disableUser", data, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            this.loadUsers();
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    darAlta(id) {
      let data = {
        userid: id,
      };
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .post("/user/enableUser", data, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            this.loadUsers();
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    goAddUser() {
      this.$router.push("/admin/users/add");
    },

    goUser(index) {
      console.log("asdf " + index);
      this.$router.push("/admin/users/" + index);
    },

    enableUser(id, email) {
      this.confirmEnableUser(id, email);
    },

    disableUser(id, email) {
      this.confirmDisableUser(id, email);
    },

    invitarUsuario() {
      let data = {};
      if (this.invitedUser == "") {
        this.openAddDialog = true;
      } else {
        this.openAddDialog = false;
        data = {
          email: this.invitedUser,
        };
        api
          .post("/auth/inviteUser", data)
          .then((response) => {
            console.log("conexion correcta");
            if (response.status == 200) {
              this.loadUsers();
              this.cursoAddedToProfesor("Se ha enviado un correo electrónico");
            }
          })
          .catch((e) => {
            console.log("error de conexion");
            console.log(e);
          });
      }
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };

      api
        .post("/auth/inviteUser", data, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            this.loadUsers();
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    checkUserLogged() {
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
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
    this.loadUsers();
    this.loadCourses();
  },
  computed: {
    filteredUsers: function () {
      return Object.values(this.users)
        .filter(
          (user) =>
            String(user[1].nombre)
              .toLowerCase()
              .match(this.search.toLowerCase()) ||
            String(user[1].apellidos)
              .toLowerCase()
              .match(this.search.toLowerCase()) ||
            String(user[1].email).toLowerCase().match(this.search.toLowerCase())
        )
        .slice(
          (this.page - 1) * this.totalPages,
          (this.page - 1) * this.totalPages + this.totalPages
        );
    },
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
  justify-content: space-between;
}

.icon-drawer {
  margin: 15px 0;
  font-size: 0.9em;
  margin-right: 5px;
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

.logout-btn-yes-disabled {
  margin: 0 !important;
  width: 100px;
  text-align: center;
  color: white;
  background-color: #7bba8a;
  padding: 10px 0;
  font-size: 1.1em;
  cursor: not-allowed;
}

.logout-btn-no:hover {
  background-color: #f24141;
}

.logout-btn-yes:hover {
  background-color: #30c954;
}

.selectCurso {
  outline: none;
  width: 100%;
  padding: 10px 5px;
}

.bubble {
  position: absolute;
  top: -15px;
  width: 100px;
  height: 25px;
  background-color: #d6d6d6;
  border-radius: 3px;
  box-shadow: 1px 1px 2px rgba(1, 1, 1, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.2s ease;
  font-size: 1.1em;
  color: black;
}

.bubble::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 78%;
  widows: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #d6d6d6;
  border-bottom: 0;
  border-right: 0;
  margin-left: 0;
  margin-bottom: -10px;
}

.activate-bubble {
  cursor: pointer;
}

.activate-bubble:hover ~ .bubble {
  opacity: 1;
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

.cursosParaProfesores {
  display: flex;
  align-items: center;
  margin-left: -3px;
  margin-top: -5px;
}

.cursosParaProfesores p {
  margin: 0;
}

.invitarprof-btn {
  background-color: #4287f5;
  display: inline-block;
  padding: 10px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 0.7em;
  transition: 0.2s ease;
  margin-right: 10px;
}

.invitarprof-btn:hover {
  background-color: #5f9bfa;
}

.input-invitarprof {
  border: 0;
  outline: none;
  width: 100%;
  padding: 5px;
}

.listaCursos {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  border-left: 2px solid rgba(1, 1, 1, 0.2);
  padding-left: 10px;
  position: relative;
}

.listaCursos::before {
  content: "";
  position: absolute;
  height: 2px;
  width: 8px;
  background-color: rgba(1, 1, 1, 0.2);
  transform: rotate(135deg);
  left: -2px;
  top: -4px;
}

.listaCursos::after {
  content: "";
  position: absolute;
  height: 2px;
  width: 8px;
  background-color: rgba(1, 1, 1, 0.2);
  transform: rotate(45deg);
  left: -2px;
  bottom: -4px;
}

.listaCursos > div {
  margin: 0;
}

.cursos-prof-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

@media (max-width: 1079px) {
  .top-info {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  .search-input {
    margin-bottom: 25px;
  }

  .btn-addnew {
    margin-right: 20px;
    width: 250px;
    text-align: center;
  }
}
</style>
