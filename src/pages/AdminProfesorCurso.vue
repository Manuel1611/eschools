<template>
  <q-page class="auth-container">
    <h3>Profesores Zone</h3>
    <h4>Un gran poder conlleva una gran responsabilidad 2</h4>
    <q-list>
      <h3>Lista</h3>
      <q-card
        flat
        bordered
        v-for="(item, index) in users"
        :key="index"
        @click="goUser(item[0])"
      >
        <q-card-section v-html="item[1].nombre + ' ' + item[1].apellidos" />

        <q-card-section v-html="item[1].email + ' ' + item[1].rol" />
      </q-card>
    </q-list>

    <div>
      <span class="goRegisterClass" @click="goAddUser"> Añadir profesor </span>
    </div>
    <div class="goRegisterClass" @click="goAddCourseToTeacher">
      Añadir curso a profesor
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
        email: "s",
        pass: "",
        retypedPass: "",
      },

      datos: [{ info: "adios" }, { info: "caracosa" }],

      users: {},
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadUsers() {
      let users;
      api
        .get("/user/profesores")
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data.usuarios);
            console.log("aaa" + users);
            users = response.data.usuarios;

            console.log("bbb" + users);

            this.users = users;
            console.log(this.users);
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
    goAddUser() {
      this.$router.push("/admin/users/add");
    },
    goAddCourseToTeacher() {
      this.$router.push("/admin/profesor/add");
    },
    goUser(index) {
      console.log("asdf " + index);
      this.$router.push("/admin/profesor/" + index);
    },
  },

  mounted() {
    console.log("mounted");
    this.loadUsers();
  },
});
</script>

<style scoped></style>
