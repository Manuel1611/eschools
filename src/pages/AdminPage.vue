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
    return {};
  },
  setup() {
    const $q = useQuasar();
    let data;
    function loadData() {
      api
        .get("/user/index")
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data.usuarios);
            data = response;
          }
        })
        .catch(() => {
          console.log("error de conexion");
          /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        });
    }
    loadData();

    let token = $q.localStorage.getItem("eschoolssessiontoken");
    let data2 = {
      sessiontoken: token,
    };
    api
      .post("/auth/checksessiontoken", data2)
      .then((response) => {
        console.log("conexion correcta token");
        if (response.status == 200) {
          console.log("conexion correcta token 2");
          console.log(response);
        } else {
          //this.$router.push("/auth");
        }
      })
      .catch(() => {
        //this.$router.push("/auth");
        console.log("error de conexion");
      });
    console.log("token");
    console.log(token);

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
      data,
      loadData,
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/auth");
    },
  },
  mounted() {
    this.$router.push("/admin/users");
  },
});
</script>

<style scoped></style>
