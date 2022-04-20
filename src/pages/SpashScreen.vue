<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
export default {
  name: "SplashScreenPage",
  mounted() {
    setTimeout(() => this.$router.push("/auth"), 2000);
  },
};
</script>

<style scoped></style>
