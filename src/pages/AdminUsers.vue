<template>
  <q-page class="auth-container">
    <h3>Usuarios Zone</h3>
    <h4>Un gran poder conlleva una gran responsabilidad</h4>
    <q-list>
      <h3>Lista</h3>
      <q-card flat bordered v-for="(item, index) in users" :key="index">
        <q-card-section
          @click="goEditUser(index)"
          v-html="item.nombre + ' ' + item.apellidos"
        />

        <q-card-section v-html="item.email + ' ' + item.rol" />
      </q-card>
    </q-list>

    <span>
      <span class="goRegisterClass" @click="goAddUser"> Añadir usuario </span>
    </span>
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
        .get("/user/index")
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
    goEditUser(id) {
      this.$router.push("users/" + id);
    },
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
    goAddUser() {
      this.$router.push("/admin/users/add");
    },
  },

  mounted() {
    console.log("mounted");
    this.loadUsers();
  },
});
</script>

<style scoped></style>
