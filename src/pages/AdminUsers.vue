<template>
  <q-page class="auth-container">
    <h3>Usuarios Zone</h3>
    <h4>Un gran poder conlleva una gran responsabilidad</h4>
    <q-list>

      <h3>Lista </h3>
      <q-card flat bordered v-for="(item, index) in users" :key="index" >
        <q-card-section v-html="item[1].nombre + ' '+ item[1].apellidos" @click="goUser(item[0])" />


        <q-card-section v-html="item[1].email + ' ' + item[1].rol" />



        <q-btn v-if="item[1].activo" style="background-color:red" @click="disableUser(item[0], item[1].email)">Dar de baja</q-btn>
        <q-btn v-else style="background-color:green" @click="enableUser(item[0], item[1].email)">Dar de alta</q-btn>
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

    return {
      confirmEnableUser(id, email){
        $q.dialog({
          title: 'Confirmar habilitar usuario',
          message: '¿Quieres habilitar a '+ email +'?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          console.log('>>>> OK')
          console.log('enableUser: ' + id)
          let data = {
            userid: id
          }

          api.post('/user/enableUser', data)
            .then((response) => {
              console.log('conexion correcta')
              if (response.status == 200){
                //console.log('conexion correcta2')
                //console.log(response)
                this.loadUsers()
              }
            })
            .catch((e) => {
              console.log('error de conexion')
              console.log(e)
            })
        }).onCancel(() => {
          console.log('>>>> Cancel')
        }).onDismiss(() => {
          console.log('I am triggered on both OK and Cancel')
        })
      },
      confirmDisableUser(id, email){
        $q.dialog({
          title: 'Confirmar deshabilitar usuario',
          message: '¿Quieres deshabilitar a '+ email +'?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          console.log('>>>> OK')

        console.log('disableUser: ' + id)
        let data = {
          userid: id
        }

        api.post('/user/disableUser', data)
          .then((response) => {
            console.log('conexion correcta')
            if (response.status == 200){
              //console.log('conexion correcta2')
              //console.log(response)
              this.loadUsers()
            }
          })
          .catch((e) => {
            console.log('error de conexion')
            console.log(e)
          })
        }).onCancel(() => {
          console.log('>>>> Cancel')
        }).onDismiss(() => {
          console.log('I am triggered on both OK and Cancel')
        })
      },

    };
  },
  methods: {


    loadUsers () {
      let users
      api.get('/user/alumnos')

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
    goAddUser() {
      this.$router.push("/admin/users/add");
    },

    goUser(index){
      console.log('asdf ' + index)
      this.$router.push("/admin/users/"+ index);
    },

    enableUser(id, email){
      this.confirmEnableUser(id, email)
    },

    disableUser(id, email){
      this.confirmDisableUser(id, email)
    }

  },

  mounted() {
    console.log("mounted");
    this.loadUsers();
  },
});
</script>

<style scoped></style>
