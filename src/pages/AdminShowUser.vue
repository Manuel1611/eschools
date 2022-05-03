<template>
  <q-page class="auth-container">
    <h3>Show Users</h3>
    <div>
      <div>
        <input type="text" class="isShow" :value="this.user.email" disabled />
      </div>
      <div>
        <input
          type="text"
          :class="this.show ? 'isShow' : 'isEdit'"
          v-model="this.user.nombre"
          :disabled="this.isDisabled"
        />
      </div>
      <div>
        <input
          type="text"
          :class="this.show ? 'isShow' : 'isEdit'"
          v-model="this.user.apellidos"
          :disabled="this.isDisabled"
        />
      </div>
      <div>
        <select
          v-model="this.user.rol"
          :class="this.show ? 'isShowSelect' : 'isEditSelect'"
          :disabled="this.isDisabled"
        >
          <option
            value="alumno"
            :selected="this.user.rol === 'alumno' ? true : false"
          >
            Alumno
          </option>
          <option
            value="profesor"
            :selected="this.user.rol === 'profesor' ? true : false"
          >
            Profesor
          </option>
        </select>
      </div>
      <div class="btns-container">
        <span
          :class="!this.show ? 'editbtn display-none' : 'editbtn display-block'"
          @click="changeEditStyles"
          >Editar</span
        >
        <span
          :class="
            this.show ? 'cancelbtn display-none' : 'cancelbtn display-block'
          "
          @click="cancelEdit"
          >Cancelar</span
        >
        <span
          :class="this.show ? 'savebtn display-none' : 'savebtn display-block'"
          @click="updateUser"
          >Guardar</span
        >
        <br /><br />
        <span
          :class="
            !this.show ? 'cancelbtn display-none' : 'cancelbtn display-block'
          "
          @click="resetPass"
          >Resetear contraseña</span
        >
      </div>
      <div>
        <span
          @click="goBack"
          >Volver</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      id: "",
      user: {},
      show: true,
      isDisabled: true,
      defaultValues: {
        nombre: "",
        apellidos: "",
        rol: "",
      },
    };
  },
  setup() {
    const $q = useQuasar();

    return {
      emailSent(msg) {
        $q.notify({
          message: msg,
          color: "green",
          badgeStyle: "opacity: 0",
        });
      },
      emailError(msg) {
        $q.notify({
          message: msg,
          color: "red",
          badgeStyle: "opacity: 0",
        });
      },
    };
  },
  methods: {
    changeEditStyles() {
      this.defaultValues.nombre = this.user.nombre;
      this.defaultValues.apellidos = this.user.apellidos;
      this.defaultValues.rol = this.user.rol;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    cancelEdit() {
      this.user.nombre = this.defaultValues.nombre;
      this.user.apellidos = this.defaultValues.apellidos;
      this.user.rol = this.defaultValues.rol;
      this.show = !this.show;
      this.isDisabled = !this.isDisabled;
    },
    updateUser() {
      let data = {
        nombre: this.user.nombre,
        apellidos: this.user.apellidos,
        rol: this.user.rol,
      };
      api
        .put("/user/" + this.id, data)
        .then((response) => {
          console.log("edit OK");
          this.show = !this.show;
          this.isDisabled = !this.isDisabled;
        })
        .catch(() => {
          console.log("edit MAL");
        });
    },
    loadUser() {
      let user;
      api
        .get("/user/" + this.id)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            console.log("aaa" + user);
            user = response.data.usuario;
            this.user = user;
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },

    goBack() {
      this.$router.push("/admin/users/");
    },

    resetPass() {
      console.log("reseteando contraseña");
      let data = {
        email: this.user.email,
        userid: this.id,
      };
      api
        .post("/user/resetPassword", data)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log(response);
            this.emailSent(response.data.message);
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
          this.emailError(response.data.message);
        });
    },
  },

  mounted() {
    this.id = this.$router.currentRoute._value.params.id;
    this.loadUser();
  },
});
</script>

<style scoped>
.btns-container {
  margin-top: 10px;
}

.editbtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
}

.cancelbtn {
  background-color: red;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
}

.savebtn {
  background-color: green;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
}

.display-none {
  display: none;
}

.display-block {
  display: inline;
}

input {
  margin: 10px;
}

.isShow {
  cursor: default !important;
  background-color: transparent;
  border: none;
  outline: none;
  opacity: 1 !important;
  border: 2px solid transparent;
}

.isEdit {
  background-color: transparent;
  border: 2px solid green;
  outline: none;
  opacity: 1 !important;
}

.isShowSelect {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  border: 0;
  border: 2px solid transparent;
  margin: 10px;
  cursor: default !important;
  opacity: 1 !important;
  outline: none;
}

.isEditSelect {
  margin: 10px;
  border: 2px solid green;
  outline: none;
}
</style>
