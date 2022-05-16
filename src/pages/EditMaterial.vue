<template>
  <q-page>
    <h3>Editar Material</h3>
    <h4>Tres gobernaban antes pero ahora Uno Reina</h4>
    <div class="form-container">
      <div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Nombre</label>
              <input type="text" name="name" v-model="material.nombre" />
            </div>
            <div>
              <label>Tipo </label>
              <input name="" v-model="this.material.tipo" disabled/>
            </div>
            <div>
              <label>Descripcion</label>
              <textarea name="" v-model="this.material.descripcion"/>

            </div>
            <div>
              <label for="">Visible</label>
              <input v-model="material.visible" type="checkbox">
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Editar material"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="no-form-container">
      <p>E-Schools</p>
    </div>

    <div @click="goBack">Volver

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { ref } from 'vue'

export default defineComponent({
  name: "AdminAddUser",
  data() {
    return {
        material: {
          name: "",
          type: "",
          data: "",
          visible: true,
      },
        cursoid: '',
        materialid: '',
        bloqueid: '',
    }
  },
  setup() {
    const $q = useQuasar();
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

    goBack(){
      this.$router.push("/curso");
    },

    submitForm() {
      let data
      if (this.material.tipo == 'tarea'){
        data = {
          nombre: this.material.nombre,
          visible : this.material.visible,
          descripcion: this.material.descripcion,
        }
      } else {
        data = {
          nombre: this.material.nombre,
          visible : this.material.visible,
        }
      }

      let url = "/material/" + this.cursoid + '/' + this.materialid
      if (this.bloqueid != ''){
        url = "/material/" + this.cursoid + '/' + this.bloqueid + '/' +  this.materialid
      }

      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
      .put(url , data, config )
      .then((response) => {
        this.registerOk(response.data.message)
      })
      .catch((error) => {
        console.log('erro de load material')
        console.log(error)
      });

    },

    loadMaterial(){
      let url = "/material/" + this.cursoid + '/' + this.materialid
      if (this.bloqueid != '' && this.bloqueid != undefined){
        url = "/material/" + this.cursoid + '/' + this.bloqueid + '/' +  this.materialid
      }
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get(url, config )
        .then((response) => {
          this.material = response.data.material
        })
        .catch((error) => {
          console.log('erro de load material')
          console.log(error)
        });
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

  mounted(){
    this.checkUserLogged()
    console.log(this.$route.query.bloqueid)
    if (this.$route.query.bloqueid != '') {
      this.bloqueid = this.$route.query.bloqueid
    }
    this.cursoid = this.$router.currentRoute._value.params.id;
    this.materialid = this.$router.currentRoute._value.params.idmaterial;
    this.loadMaterial()
  }
});
</script>

<style scoped>
</style>
