<template>
  <q-page class="auth-container"> </q-page>
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
        let data = {
          nombre: this.register.name,
          apellidos: this.register.surname,
          email: this.register.email,
          password: this.register.pass,
        };
        api
          .post("/auth/register", data)
          .then((response) => {
            this.$router.push("/auth");
          })
          .catch(() => {
            this.registerError("No se ha podido registrar");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },
    goLogin() {
      this.$router.push("/auth");
    },
    checkUserLogged() {
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .post("/auth/checksessiontoken", {}, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 22222");
          } else {
            q.notify({
              color: 'negative',
              position: 'top',
              message: 'Sesión caducada.',
              icon: 'report_problem'
            })
            this.$router.push("/auth");
          }
        })
        .catch((e) => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: e,
            icon: 'report_problem'
          })
          this.$router.push("/auth");
          console.log("error de conexion sesion");
        });
    },
  },
});
</script>

<style scoped></style>
