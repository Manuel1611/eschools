<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        ¡Vaya! Parece que te has perdido...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Volver"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMeta } from "quasar";

const metaData = {
  title: "E-Schools - 404",
};

export default defineComponent({
  name: "ErrorNotFound",
  setup() {
    useMeta(metaData);
    return {};
  },
});
</script>

<style scoped>
@media (max-width: 480px) {
  .text-h2 {
    font-size: 2em;
  }
}
</style>
