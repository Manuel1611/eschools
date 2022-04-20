<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      server: "http://localhost:3000/",
    };
  },
});
</script>
