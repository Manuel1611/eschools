<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Añade a nuevos usuarios</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Da de alta a nuevos integrantes para la academia</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>

    <div class="form-container">
      <div>
        <form ref="form">
          <div>
            <label for="name">Nombre</label>
            <input type="text" name="name" v-model="register.name" />
          </div>
          <div>
            <label for="surname">Apellidos</label>
            <input type="text" name="surname" v-model="register.surname" />
          </div>
          <div>
            <label for="email">Correo electrónico</label>
            <input type="email" name="email" v-model="register.email" />
          </div>
          <div>
            <label for="pass">Contraseña</label>
            <input type="password" name="pass" v-model="register.pass" />
          </div>
          <div>
            <label for="retypedPass">Repetir contraseña</label>
            <input
              type="password"
              name="retypedPass"
              v-model="register.retypedPass"
            />
          </div>

          <div>
            <label for="rol">Alumno / Profesor</label>
            <select name="rol" v-model="register.rol">
              <option value="alumno">Alumno</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>
          <div>
            <input
              class="btn-register"
              type="button"
              name="button"
              @click="submitForm"
              value="Registrar usuario"
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
      register: {
        name: "",
        surname: "",
        email: "",
        pass: "",
        retypedPass: "",
        rol: "",
      },
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
      this.$router.push("/admin/users");
    },

    submitForm() {
      if (
        this.register.name != "" &&
        this.register.surname != "" &&
        this.register.email != "" &&
        this.register.pass != "" &&
        this.register.retypedPass != "" &&
        this.register.rol != ""
      ) {
        let data = {
          nombre: this.register.name,
          apellidos: this.register.surname,
          email: this.register.email,
          password: this.register.pass,
          rol: this.register.rol,
        };
        const $q = useQuasar();
        let token = this.$q.localStorage.getItem("eschoolssessiontoken");
        let config = {
          headers: {
            "x-access-token": token,
          },
        };
        api
          .post("/user/store", data, config)
          .then((response) => {
            this.registerOk("Usuario añadido correctamente");
            this.register.name = "";
            this.register.surname = "";
            this.register.email = "";
            this.register.pass = "";
            this.register.retypedPass = "";
            this.register.rol = "";
          })
          .catch(() => {
            this.registerError("No se ha podido añadir al usuario");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
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
}
</style>
