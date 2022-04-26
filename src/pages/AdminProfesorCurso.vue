<template>
  <q-page>
    <h3>Profesores</h3>
    <h4>A veces un hipocrita es solo un hombre en proceso de cambio</h4>

    <div class="no-form-container">
      <p>E-Schools</p>
    </div>
    <button @click="goAddProfesorCurso()">Añadir profesor a un curso</button>
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

    goAddProfesorCurso(){
      this.$router.push("/admin/profesor/add");
    },
  },

  mounted(){

  }
});
</script>

<style scoped>
</style>
