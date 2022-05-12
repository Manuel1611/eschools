<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AuthLayout",
  methods: {
    checkLoggedUser() {
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let data2 = {
      //  sessiontoken: token,
      };

      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      let headers = {
        'x-access-token' : token
      }
      api
        .post("/auth/checksessiontoken", data2, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 2");
            this.$router.push("/curso");
          }
        })
        .catch(() => {
        });
    },
  },
  mounted() {
   // this.checkLoggedUser();
  },
});
</script>
