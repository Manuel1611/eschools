<template>
  <q-page class="auth-container">
    <div class="form-container">
      <div>
        <div class="title">Regístrate</div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Nombre</label>
              <input type="text" name="name" v-model="register.name" />
            </div>
            <div>
              <label for="">Apellidos</label>
              <input type="text" name="surname" v-model="register.surname" />
            </div>
            <div>
              <label for="">Correo electrónico</label>
              <input type="email" name="email" v-model="register.email" />
            </div>
            <div>
              <label for="">Contraseña</label>
              <input
                type="password"
                minlength="8"
                name="pass"
                v-model="register.pass"
              />
            </div>
            <div>
              <label for="">Repetir contraseña</label>
              <input
                type="password"
                name="retypedPass"
                minlength="8"
                v-model="register.retypedPass"
              />
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Crear cuenta"
              />
            </div>
            <div class="no-acc">
              <span
                >¿Ya tienes una cuenta?
                <span class="goRegisterClass" @click="goLogin"
                  >Inicia sesión</span
                >.</span
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="no-form-container">
      <p>E-Schools</p>
      <div class="auth-img-container">
        <div class="login-img"></div>
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
      register: {
        name: "",
        surname: "",
        email: "",
        pass: "",
        retypedPass: "",
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
    submitForm() {
      if (
        this.register.name != "" &&
        this.register.surname != "" &&
        this.register.email != "" &&
        this.register.pass != "" &&
        this.register.retypedPass != ""
      ) {
        if (this.validateEmail(this.register.email)) {
          if (this.register.pass.length >= 8) {
            if (this.register.pass == this.register.retypedPass) {
              let data = {
                nombre: this.register.name,
                apellidos: this.register.surname,
                email: this.register.email,
                password: this.register.pass,
                repassword: this.register.retypedPass,
              };
              api
                .post("/auth/register", data)
                .then((response) => {
                  this.$router.push({
                    name: "/login",
                    params: { gotRegistered: true },
                  });
                })
                .catch(() => {
                  this.registerError("No se ha podido crear la cuenta");
                });
            } else {
              this.registerError("Las contraseñas no coinciden");
            }
          } else {
            this.registerError("La contraseña no es válida");
          }
        } else {
          this.registerError("El correo introducido no es válido");
        }
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    goLogin() {
      this.$router.push("/auth");
    },
  },
});
</script>

<style scoped>
.auth-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  font-family: sans-serif;
  font-size: 1.1em;
}

.form-container,
.no-form-container {
  flex: 1;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.bar {
  width: 100px;
  height: 2px;
  background-color: black;
  margin-bottom: 50px;
}

.form form,
.form form div {
  display: flex;
  flex-direction: column;
}

.no-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-form-container p {
  font-size: 4em;
  width: 60%;
  margin-bottom: 75px;
  color: black;
}

.login-img {
  background: url(assets/img/register-img.png) center center no-repeat;
  width: 300px;
  height: 300px;
  background-size: cover;
}

.auth-img-container {
  width: 500px;
  height: 400px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  background-color: #5f9bc9;
}

.title {
  font-size: 2.5em;
  margin-bottom: 20px;
}

label,
input {
  margin-bottom: 10px;
  font-size: 1.2em;
}

label {
  margin-top: 20px;
  position: relative;
  margin-left: 25px;
}

label::before {
  content: "\25BA";
  position: absolute;
  left: -25px;
  color: white;
}

input {
  width: 400px;
  outline: none;
  border: 0;
  border-radius: 3px;
  padding: 5px 10px;
  border: 1px solid #226294;
}

input[type="button"] {
  width: 50%;
  border: 2px solid #226294;
  margin-top: 50px;
  background-color: #226294;
  color: white;
  transition: 0.1s ease;
}

input[type="button"]:hover {
  cursor: pointer;
  background-color: transparent;
}

.no-acc {
  margin-top: 25px;
  font-size: 1.1em;
  display: flex;
}

.goRegisterClass:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
