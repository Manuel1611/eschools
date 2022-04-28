<template>
  <q-page class="auth-container">
    <h3>Show Profesor</h3>
    {{ this.user }}
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
      id: "",
      user: {},
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadUser() {
      let user;
      api
        .get("/user/" + this.id)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            console.log("aaa" + user);
            user = response.data.usuario;

            // console.log('bbb'+ users)

            this.user = user;
            //console.log(this.users)
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
          /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        });
    },

    goBack() {
      console.log("asdf " + index);
      this.$router.push("/admin/users/");
    },
  },

  mounted() {
    this.id = this.$router.currentRoute._value.params.id;
    this.loadUser();
    //console.log(this.$router.currentRoute._value.params.id)
  },
});
</script>

<style scoped></style>
