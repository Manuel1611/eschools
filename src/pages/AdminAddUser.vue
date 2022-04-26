<template>
  <q-page>
    <h3>Añadir usuarios</h3>
    <h4>Entonces, ¿importa el destino? ¿O es el camino que tomamos? </h4>

    <div class="form-container">
      <div>
        <div class="title">Regístrate</div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Nombre</label>
              <input type="text" name="name" v-model="register.name" />
            </div>
            <div>
              <label for="">Apellidos</label>
              <input type="text" name="surname" v-model="register.surname" />
            </div>
            <div>
              <label for="">Correo electrónico</label>
              <input type="email" name="email" v-model="register.email" />
            </div>
            <div>
              <label for="">Contraseña</label>
              <input type="password" name="pass" v-model="register.pass" />
            </div>
            <div>
              <label for="">Repetir contraseña</label>
              <input
                type="password"
                name="retypedPass"
                v-model="register.retypedPass"
              />
            </div>

            <div>
              <label for="">Rol</label>
              <select
                name="rol"
                v-model="register.rol"
              >
              <option value="alumno">Alumno</option>
              <option value="profesor">Profesor</option>
              </select>
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Registrarse"
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
        register: {
        name: "",
        surname: "",
        email: "",
        pass: "",
        retypedPass: "",
        rol: "",
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
      this.$router.push("/admin/users");
    },

    submitForm() {
      if (
        this.register.name != "" &&
        this.register.surname != "" &&
        this.register.email != "" &&
        this.register.pass != "" &&
        this.register.retypedPass != "" &&
        this.register.rol != ""
      ) {
        let data = {
          nombre: this.register.name,
          apellidos: this.register.surname,
          email: this.register.email,
          password: this.register.pass,
          rol: this.register.rol
        };
        api
          .post("/user/store", data)
          .then((response) => {
            //this.$router.push("/auth");
            this.registerOk("Usuario añadido");
          })
          .catch(() => {
            this.registerError("No se ha podido registrar");
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
