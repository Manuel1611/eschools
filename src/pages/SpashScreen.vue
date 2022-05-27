<template>
  <q-page class="flex flex-center direction-column">
    <div class="bg-info"></div>
    <q-circular-progress
      indeterminate
      size="45px"
      :thickness="1"
      color="grey-8"
      track-color="info"
      class="q-ma-md progress-splash"
    />
    <div class="title">E-Schools - Desarrollado por GG, MG y CG</div>
  </q-page>
  <!---->
  <!---->
</template>

<script>
export default {
  name: "SplashScreenPage",
  mounted() {
    setTimeout(() => this.$router.push({ name: "/login" }), 2500);
  },
};
</script>

<style scoped>
.direction-column {
  flex-direction: column;
}

.progress-splash {
  position: absolute;
  bottom: 60px;
}

.title {
  position: absolute;
  bottom: 20px;
  font-size: 1em;
  color: #1c5785;
}

.bg-info {
  background: url(assets/img/logo-eschools.png) center center no-repeat !important;
  background-size: contain !important;
  width: 200px;
  height: 200px;
}
</style>
