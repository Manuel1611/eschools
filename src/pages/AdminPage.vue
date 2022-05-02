<template>
  <q-page class="auth-container"> </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminPage",
  mounted() {
    this.$router.push("/admin/users");
  },
});
</script>

<style scoped></style>
