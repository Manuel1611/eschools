<template>
  <q-page>
    <h3>Añadir Material</h3>
    <h4>Honor no está muerto mientras permanezca en el corazón de los hombres </h4>
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
              <label for="">Tipo</label>
              <select v-model="material.type">
                <option name="enlace">Enlace</option>
                <option name="pdf">PDF</option>
                <option name="tarea">Tarea</option>
              </select>
            </div>

            <div>
              <label>Material</label>

              <input v-model="material.data" type="text">
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
                value="Añadir material"
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
      if (
        this.material.name != "" &&
        this.material.type != "" &&
        this.material.data != "" &&
        this.material.visible != "" &&
        this.id != ""
      ) {
        let data = {
          nombre: this.material.name,
          tipo: this.material.type,
          data: this.material.data,
          visible: this.material.visible,
          curso: this.id,
        };
        api
          .post("/material/store", data)
          .then((response) => {
            //this.$router.push("/auth");
            this.registerOk("Material añadido");
          })
          .catch(() => {
            this.registerError("No se ha podido añadir el curso");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }
    },

  },

  mounted(){
    this.id = this.$router.currentRoute._value.params.id;
  }
});
</script>

<style scoped>
</style>
