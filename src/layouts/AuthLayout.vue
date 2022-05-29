<template>
  <q-layout view="lHh Lpr lFf" class="lay">
    <div class="m-footer">
      <div class="m-footer-inner">
        <div class="link-footer" @click="goCondiciones">Condiciones de uso</div>
        <div
          class="link-footer"
          @click="goPoliticaPriv"
          style="margin-left: 20px"
        >
          Política de Privacidad
        </div>
      </div>
      <div>
        <div class="cop">
          {{ new Date().getFullYear() }} © Copyright · E-Schools
        </div>
      </div>
    </div>
    <q-page-container class="pcon">
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
    goCondiciones() {
      this.$router.push("/legal/condiciones-de-uso");
    },
    goPoliticaPriv() {
      this.$router.push("/legal/politica-privacidad");
    },
    checkLoggedUser() {
      const $q = useQuasar();
      let token = $q.localStorage.getItem("eschoolssessiontoken");
      let data2 = {
        //  sessiontoken: token,
      };

      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      let headers = {
        "x-access-token": token,
      };
      api
        .post("/auth/checksessiontoken", data2, config)
        .then((response) => {
          console.log("conexion correcta token");
          if (response.status == 200) {
            console.log("conexion correcta token 2");
            this.$router.push("/curso");
          }
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.checkLoggedUser();
  },
});
</script>
<style scoped>
.m-footer {
  position: absolute;
  z-index: 9999;
  bottom: 0;
  background-color: white;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  color: black;
  height: 60px;
  align-items: center;
  box-shadow: 0 0 2px rgba(1, 1, 1, 0.7);
}

.m-footer-inner {
  display: flex;
  width: 300px;
  justify-content: space-between;
}

.cop {
  font-size: 0.8em;
  margin-top: 5px;
}

.link-footer {
  cursor: pointer;
  margin-top: 10px;
}

.link-footer:hover {
  text-decoration: underline;
}
</style>
