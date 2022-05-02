<template>
  <q-page class="auth-container">
    <h3>Admin Zone</h3>
    <h4>Un gran poder conlleva una gran responsabilidad</h4>
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
        email: "",
        pass: "",
        retypedPass: "",
      },
    };
  },
  setup() {
    const $q = useQuasar();
    let data
    function loadData () {

      api.get('/user/index')
        .then((response) => {
          console.log('conexion correcta')
          if (response.status == 200){
            console.log('conexion correcta2')
            console.log(response.data.usuarios)
            data = response
          }
        })
        .catch(() => {
          console.log('error de conexion')
           /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        })
      }
    loadData()




    let token = $q.localStorage.getItem('eschoolssessiontoken')
    let data2 = {
      sessiontoken: token
    }
    api.post('/auth/checksessiontoken', data2)
      .then((response) => {
        console.log('conexion correcta token')
        if (response.status == 200){
          console.log('conexion correcta token 2')
          console.log(response)

        } else {
          //this.$router.push("/auth");
        }
      })
      .catch(() => {
        //this.$router.push("/auth");
        console.log('error de conexion')
      })
    console.log('token')
    console.log(token)




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
      loadData
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


  },

});
</script>

<style scoped>
</style>
