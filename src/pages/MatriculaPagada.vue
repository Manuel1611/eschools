<template>
  <q-page>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Matrícula pagada</div>
    </div>
    <p class="desc">
      Tu pago se ha realizado correctamente. Gracias por confiar en nosotros.
    </p>
    <div class="btn-addnew" @click="goBack">Vuelve a tus cursos</div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {};
  },
  setup() {
    const $q = useQuasar();
    return {};
  },
  methods: {
    goBack() {
      this.$router.push("/curso/miscursos");
    },
  },
  mounted() {},
});
</script>

<style scoped>
.q-page {
  padding: 20px;
}

.title {
  margin-top: 20px;
  font-size: 1.75em;
  display: flex;
  align-items: center;
}

.icon-drawer {
  margin: 15px 0;
  font-size: 0.9em;
  margin-right: 5px;
}

.desc {
  margin-top: 20px;
  font-size: 1.2em;
}

.btn-addnew {
  background-color: #05beed;
  display: inline-block;
  padding: 10px;
  color: black;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
}

.btn-addnew:hover {
  background-color: #12ccfc;
}
</style>
