<template>
  <q-page>
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
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Alumnos en E-Schools</div>
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
        </q-item-section>

        <q-item-section side>
          <q-icon class="activate-bubble" name="info" color="green" />
          <div v-if="item[1].activo" class="bubble">Activo</div>
          <div v-else class="bubble">Inactivo</div>
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
        v-if="users.length >= 8"
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
import { useMeta } from "quasar";

const metaData = {
  title: "E-Schools - Usuarios",
};

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      openBajaDialog: false,
      openAltaDialog: false,
      correoBajaAlta: "",
      idBajaAlta: "",
      users: {},
      search: "",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 8,
    };
  },
  setup() {
    useMeta(metaData);
    const $q = useQuasar();
    return {};
  },
  methods: {
    loadUsers() {
      let users;
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .get("/user/alumnos", config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            users = response.data.usuarios;
            this.users = users;
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    darBaja(id) {
      const $q = useQuasar();
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      let data = {
        userid: id,
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
    goFirstPage() {
      console.log("aaaaaaaa");
      this.currentPage = 1;
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
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },
  },
  mounted() {
    this.checkUserLogged();
    this.loadUsers();
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
  watch: {
    search: function () {
      this.page = 1;
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

.btn-addnew:hover {
  background-color: #30c954;
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

@media (max-width: 480px) {
  .btn-addnew,
  .search-input {
    width: 160px;
  }
}
</style>
