<template>
  <q-page>
    <h3>Añadir Curso</h3>
    <h4>Entonces, ¿importa el destino? ¿O es el camino que tomamos? </h4>

    <div class="form-container">
      <div>
        <div class="title">Regístrate</div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Nombre</label>
              <input type="text" name="name" v-model="curso.name" />
            </div>
            <div>
              <label for="">Precio</label>
              <input type="number" name="price" v-model="curso.price" />
            </div>
            <div>
              <label for="">Descripcion</label>
              <textarea name="description" v-model="curso.description" ></textarea>
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Añadir curso"
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
        curso: {
        name: "",
        description: "",
        price: "",
      },
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
      this.$router.push("/admin/cursos");
    },

    submitForm() {
      if (
        this.curso.name != "" &&
        this.curso.description != "" &&
        this.curso.price != ""
      ) {
        let data = {
          nombre: this.curso.name,
          descripcion: this.curso.description,
          precio: this.curso.price,
        };
        api
          .post("/curso/store", data)
          .then((response) => {
            //this.$router.push("/auth");
            this.registerOk("Curso añadido");
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

  }
});
</script>

<style scoped>
</style>
