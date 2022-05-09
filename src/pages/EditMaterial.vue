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
      let data = {
        nombre: this.material.nombre,
        visible : this.material.visible
      }
      api
      .put("/material/" + this.cursoid + '/' + this.materialid, data )
      .then((response) => {
        this.registerOk(response.data.message)
      })
      .catch((error) => {
        console.log('erro de load material')
        console.log(error)
      });

    },

    loadMaterial(){
    api
      .get("/material/" + this.cursoid + '/' + this.materialid )
      .then((response) => {
        console.log('get material by id')
        console.log(response.data)
        this.material = response.data.material
        console.log(this.material)
      })
      .catch((error) => {
        console.log('erro de load material')
        console.log(error)
      });
    }

  },

  mounted(){
    this.cursoid = this.$router.currentRoute._value.params.id;
    this.materialid = this.$router.currentRoute._value.params.idmaterial;
    this.loadMaterial()
  }
});
</script>

<style scoped>
</style>
