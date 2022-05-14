<template>
  <q-page>
    <h2>Matricula pagada</h2>
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
      users: {},
      search: "",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 8,
    };
  },
  setup() {
    const $q = useQuasar();
    return {};
  },
  methods: {
    loadUsers() {
      let users;
      api
        .get("/user/alumnos")
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
      let data = {
        userid: id,
      };
      api
        .post("/user/disableUser", data)
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

      api
        .post("/user/enableUser", data)
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
  },
  mounted() {
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
</style>
