<template>
  <q-page class="auth-container">
    <div class="login-success-register-container" v-if="login.iamregistered">
      <div class="login-success-register">
        <div>¡Tu cuenta se ha creado correctamente!</div>
        <div class="registered-btn-ext" @click="closeRegisterModal">
          Aceptar
        </div>
      </div>
    </div>
    <div class="form-container">
      <div>
        <div class="title">Inicia sesión</div>
        <div class="bar"></div>
        <div class="form">
          <form>
            <div>
              <label for="">Correo electrónico</label>
              <input type="email" name="email" v-model="login.email" />
            </div>
            <div>
              <label for="">Contraseña</label>
              <input
                type="password"
                maxlength="8"
                name="pass"
                v-model="login.pass"
              />
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Acceder"
              />
            </div>
            <div class="no-acc">
              <span
                >¿No tienes una cuenta?
                <span class="goRegisterClass" @click="goRegister"
                  >Regístrate aquí</span
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
  name: "LoginPage",
  data() {
    return {
      login: {
        email: "",
        pass: "",
        iamregistered: false,
      },
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loginError(msg) {
        $q.notify({
          message: msg,
          color: "red",
          badgeStyle: "opacity: 0",
        });
      },
      loginOk(msg) {
        $q.notify({
          message: msg,
          color: "green",
          badgeStyle: "opacity: 0",
        });
      },

      saveLocalStorage(key, value) {
        $q.localStorage.set(key, value);
      },
    };
  },
  methods: {
    submitForm() {
      if (this.login.email != "" && this.login.pass != "") {
        let data = {
          email: this.login.email,
          password: this.login.pass,
        };
        api
          .post("/auth/login", data)
          .then((response) => {
            if (response.status == 200) {
              console.log(response.data.token);
              this.saveLocalStorage(
                "eschoolssessiontoken",
                response.data.token
              );
              if (response.data.rol == "Administrador") {
                this.$router.push("/admin");
              } else {
                this.$router.push("/curso/miscursos");
              }
            } else {
              this.loginError(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
            this.loginError("El correo o la contraseña son incorrectos");
          });
      } else {
        this.loginError("Todos los campos son obligatorios");
      }
    },
    closeRegisterModal() {
      this.login.iamregistered = false;
    },
    goRegister() {
      this.$router.push("/auth/register");
    },
  },
  mounted() {
    if (this.$route.params.gotRegistered) {
      this.login.iamregistered = true;
    }
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
  position: relative;
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
  margin-bottom: 100px;
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
  background: url(assets/img/login-img.png) center center no-repeat;
  width: 400px;
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

.login-success-register-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;
}

.login-success-register {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  min-width: 300px;
  height: 175px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.registered-btn-ext {
  width: 175px;
  margin-top: 25px;
  background-color: #226294;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  outline: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
