<template>
  <q-page class="auth-container">
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
            this.loginOk(response.data.message);
          })
          .catch(() => {
            this.loginError("El correo o la contraseña son incorrectos");
          });
      } else {
        this.loginError("Todos los campos son obligatorios");
      }
    },
    goRegister() {
      this.$router.push("/auth/register");
    },
  },
  mounted() {
    console.log("aaaaaaaaaaaa " + this.$route.params.gotRegistered);
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
}

.bar {
  width: 100px;
  height: 2px;
  background-color: #004011;
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
  color: #004011;
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
  border-top: 2px solid #004011;
  border-right: 2px solid #004011;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  background-color: #f2fff2;
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
  color: #004011;
}

input {
  width: 400px;
  outline: none;
  border: 0;
  border-radius: 3px;
  padding: 5px 10px;
  border: 1px solid #004011;
}

input[type="button"] {
  width: 50%;
  border: 2px solid #004011;
  margin-top: 50px;
  background-color: #004011;
  color: white;
  transition: 0.1s ease;
}

input[type="button"]:hover {
  cursor: pointer;
  background-color: transparent;
  color: black;
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
