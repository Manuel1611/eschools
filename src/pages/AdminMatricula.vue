<template>
  <q-page>
    <h3>Matriculas</h3>
    <h4>Viaje antes que Destino</h4>

    <div class="no-form-container">
      <p>E-Schools</p>
    </div>
    <button @click="goAddMatricula()">Añadir matricula</button>
  </q-page>





</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AdminAddUser",
  data() {
    return {
        register: {
        name: "",
        surname: "",
        email: "",
        pass: "",
        retypedPass: "",
        rol: "",
      },
    }
  },
  setup() {
    const $q = useQuasar();
    return {

    }
  },
  methods: {

    goAddMatricula(){
      this.$router.push("/admin/matricula/add");
    },
  },

  mounted(){

  }
});
</script>

<style scoped>
</style>
