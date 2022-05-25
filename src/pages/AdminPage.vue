<template>
  <q-page class="auth-container"> </q-page>
  <!---->
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "RegisterPage",
  data() {
    return {};
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
    goLogin() {
      this.$router.push("/auth");
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
    this.$router.push("/admin/users");
  },
});
</script>

<style scoped></style>
