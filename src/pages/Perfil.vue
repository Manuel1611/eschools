<template>
  <q-page class="auth-container">
    <q-dialog
      v-model="openResetPassDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Cambiar contraseña</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          Se te enviará un correo con las instrucciones a seguir. ¿Estás de
          acuerdo?
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div class="logout-btn-yes" v-close-popup @click="resetPass">
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Tu perfil</div>
    </div>

    <div class="top-info">
      <div class="query-found">
        <q-icon
          class="icon-drawer"
          color="white"
          name="fa-solid fa-angle-right"
        />
        <div>Ve tu perfil y pide un cambio de contraseña</div>
      </div>
      <div class="btn-addnew" @click="goBack">Volver</div>
    </div>

    <div class="form-container">
      <div>
        <label for="email">Correo electrónico</label>
        <div>
          <q-icon
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <input
            type="text"
            class="remove-opacity"
            name="email"
            :value="this.user.email"
            disabled
          />
        </div>
      </div>
      <div>
        <label for="name">Nombre</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="name"
            v-model="this.user.nombre"
            :disabled="this.isDisabled"
          />
        </div>
      </div>
      <div>
        <label for="surname">Apellidos</label>
        <div>
          <q-icon
            v-if="this.show"
            class="icon-drawer"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <q-icon
            v-else
            class="icon-drawer ml"
            color="white"
            name="fa-solid fa-angle-right"
          />
          <input
            type="text"
            :class="this.show ? 'remove-opacity' : 'isEdit'"
            name="surname"
            v-model="this.user.apellidos"
            :disabled="this.isDisabled"
          />
        </div>
      </div>
      <div class="btns-container">
        <div>
          <input
            :class="
              !this.show
                ? 'btn-register2 display-none'
                : 'btn-register2 display-block'
            "
            type="button"
            name="button"
            @click="openResetPassDialog = true"
            value="Cambiar contraseña"
          />
        </div>
        <div style="display: flex">
          <div>
            <input
              :class="
                this.show
                  ? 'btn-register3 display-none'
                  : 'btn-register3 display-block'
              "
              type="button"
              name="button"
              @click="cancelEdit"
              value="Cancelar"
            />
          </div>
          <div>
            <input
              :class="
                this.show
                  ? 'btn-register display-none'
                  : 'btn-register display-block'
              "
              type="button"
              name="button"
              @click="updateUser"
              value="Guardar"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PerfilPage",
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
      openResetPassDialog: false,
      nombreDelUser: "",
      uid: "",
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
            this.nombreDelUser = this.user.nombre;
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
    goBack() {
      this.$router.push("/curso/miscursos");
    },

    resetPass() {
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
    if (this.$route.query.id != null) {
      this.uid = this.$route.query.id;
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + this.uid);
    this.loadUser();
  },
});
</script>

<style scoped>
.q-page {
  padding: 20px;
}

.title {
  margin-top: 20px;
  font-size: 1.5em;
  display: flex;
  align-items: center;
}

.icon-drawer {
  margin: 15px 0;
  font-size: 0.9em;
  margin-right: 5px;
}

.top-info {
  background-color: #525252;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.query-found {
  position: absolute;
  left: 0;
  padding-left: 25px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: white;
}

.btn-addnew {
  background-color: #05beed;
  display: inline-block;
  padding: 10px 20px;
  color: black;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
}

.btn-addnew:hover {
  background-color: #12ccfc;
}

.form-container {
  margin-top: 50px;
}

.form-container > div {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 40%;
  min-width: 300px;
  padding: 5px 0;
  outline: none;
  border: 0;
  border-bottom: 2px solid #226294;
}

label::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: #02afdb;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
}

select {
  margin-top: 10px;
  width: 40%;
  min-width: 300px;
  padding: 6px;
  background-color: #dedcdc;
  border: 0;
  outline: none;
  appearance: none;
}

label {
  font-size: 1.1em;
  margin-top: 20px;
  position: relative;
  margin-left: 20px;
}

.btn-register {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
}

.btn-register:hover {
  background-color: #30c954;
}

.btn-register2 {
  background-color: #c92804;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
  margin-top: 25px;
}

.btn-register2:hover {
  background-color: #d92b04;
}

.btn-register3 {
  background-color: #c92804;
  display: inline-block;
  padding: 10px 20px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 25px;
  text-align: center;
  outline: none;
  border: 0;
  width: fit-content;
}

.btn-register3:hover {
  background-color: #d92b04;
}

.remove-opacity {
  background-color: transparent;
  opacity: 1 !important;
  cursor: default !important;
  border-bottom: 2px solid transparent !important;
  position: relative;
  color: black;
}

.isShowSelect {
  background-color: transparent;
  opacity: 1 !important;
  padding-left: 0;
  position: relative;
  cursor: default !important;
  color: black;
}

.ml {
  margin-left: -15px;
}

.display-none {
  display: none !important;
}

.display-block {
  display: inline-block !important;
}

.background-myblue {
  background-color: #226294;
}

.logoutModal-margins {
  margin: 20px 0;
  border-radius: 0 !important;
  padding: 0;
}

.logout-btn-no,
.logout-btn-yes {
  margin: 0 !important;
  width: 100px;
  text-align: center;
  color: white;
  cursor: pointer;
  padding: 10px 0;
  font-size: 1.1em;
}

.logout-btn-no {
  background-color: #d42c2c;
  transition: 0.2s ease;
}

.logout-btn-yes {
  background-color: #21ba45;
  transition: 0.2s ease;
}

.logout-btn-no:hover {
  background-color: #f24141;
}

.logout-btn-yes:hover {
  background-color: #30c954;
}
</style>
