<template>
  <q-page class="flex flex-center direction-column">
    <div class="bg-img">
      <q-circular-progress
        indeterminate
        size="60px"
        :thickness="0.2"
        color="white"
        center-color="grey-8"
        track-color="transparent"
        class="q-ma-md"
      />
    </div>
    <div class="title">E-Schools</div>
  </q-page>
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
.bg-img {
  background: url(assets/img/splash-img.png) center center no-repeat;
  width: 400px;
  height: 400px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.direction-column {
  flex-direction: column;
}

.title {
  font-size: 1.5em;
  color: #1c5785;
}
</style>
