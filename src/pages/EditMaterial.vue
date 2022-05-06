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
              <input type="text" name="name" v-model="material.name" />
            </div>
            <div>
              <label for="">Tipo: *Inserte Tipo*</label>

            </div>

            <div>
              <label>Material: *Inserte material* </label>
              <!--<q-file

                @value="file"
                @update:model-value="setFile()"
                label="Pick one file"
                filled

                style="max-width: 300px"
              />-->
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
        id: "",
        file : ref(null),
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


    },

    setFile(files){
      console.log('a b c')
      console.log(files)
      //console.log(e)
      this.file = files[0]
    }

  },

  mounted(){
    this.id = this.$router.currentRoute._value.params.id;
  }
});
</script>

<style scoped>
</style>
