<template>
  <q-page class="auth-container">
    <div class="title">
          <q-dialog
      v-model="openCalificarDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="background-myblue text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Calificar entrega de {{this.calificacion.nombre + ' ' + this.calificacion.apellidos}}</div>
          <div class="text-h6">{{this.calificacion.email}}</div>
        </q-card-section>

        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          <label>Nota</label>
          <input type="number" v-model="this.calificacion.nota">
        </q-card-section>
        <q-card-section style="font-size: 1.1em" class="q-pt-none">
          <label>Comentario (opcional)</label>
          <textarea v-model="this.calificacion.comentario"></textarea>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal logoutModal-margins"
        >
          <div class="logout-btn-no" v-close-popup>Cancelar</div>
          <div
            class="logout-btn-yes"
            v-close-popup
            @click="sendCalification()"
          >
            Aceptar
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Show Tarea Para el profesor</div>
    </div>
    <q-list bordered>
      <q-item
        v-for="(item, index) in this.entregas"
        :key="index">
        {{item[1].nombre + ' ' + item[1].apellidos}}
        <br>
        {{item[1].email}}
        <a :href="this.server +'/usuarios/' + item[0] + '/' +idtarea +'/' + item[1].entrega[idtarea].file" target="_blank">Entrega</a>
        <br>

        <q-btn @click="calificarDialog(item[0], item[1])">
          Calificar entrega
        </q-btn>
      </q-item>
    </q-list>

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
      entregas: {},
      idcurso : '',
      idtarea : '',
      server: "http://localhost:3000/public/",
      openCalificarDialog: false,
      calificacion: {
        nombre: '',
        apellidos: '',
        email: '',
        id: '',
        nota: '',
        comentario: '',
      }
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadEntregas(){
      api
        .get("/tarea/getTareasEntregadas/" + this.idtarea)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            this.entregas = response.data.usuarios
          }
        })
    },
    calificarDialog(id, user){
      this.calificacion.nombre = user.nombre
      this.calificacion.apellidos = user.apellidos
      this.calificacion.email = user.email
      this.calificacion.id = id
      this.calificacion.nota = ''
      this.calificacion.comentario = ''
      this.openCalificarDialog = true

    },

    sendCalification(){
      console.log('Enviando calificacion al servidor')
      let data = {
        idtarea: this.idtarea,
        iduser: this.calificacion.id,
        nota: this.calificacion.nota,
        comentario: this.calificacion.comentario,
      }
      api
        .post("/tarea/calificarTarea/", data)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
          }
        })
        .catch((error) =>{
          console.log('error calificando')
          console.log(error)
        })
    }
  },
  mounted() {
    this.idtarea = this.$router.currentRoute._value.params.idtarea;
    this.loadEntregas()
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

.btn-addnew {
  background-color: #21ba45;
  display: inline-block;
  padding: 10px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
}

.each-item {
  margin: 25px 0;
  padding: 16px 0;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 40px;
}

.background-myblue {
  background-color: #226294;
}

.logoutModal-margins {
  margin: 20px 0;
  border-radius: 0 !important;
  padding: 0;
}

.btn-addnew:hover {
  background-color: #30c954;
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

.bubble {
  position: absolute;
  top: -15px;
  width: 100px;
  height: 25px;
  background-color: #d6d6d6;
  border-radius: 3px;
  box-shadow: 1px 1px 2px rgba(1, 1, 1, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.2s ease;
  font-size: 1.1em;
  color: black;
}

.bubble::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 78%;
  widows: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #d6d6d6;
  border-bottom: 0;
  border-right: 0;
  margin-left: 0;
  margin-bottom: -10px;
}

.activate-bubble {
  cursor: pointer;
}

.activate-bubble:hover ~ .bubble {
  opacity: 1;
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
  font-size: 1.1em;
  color: white;
  display: flex;
  align-items: center;
}

.search-input {
  margin-right: 20px;
  padding: 10px 5px;
  width: 250px;
  outline: none;
  border: 0;
  font-size: 1.1em;
  border-radius: 3px;
}

.precio-container {
  width: 160px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #c92804;
  position: relative;
}

.precio-container::before {
  content: "";
  position: absolute;
  left: 10px;
  bottom: -10px;
  width: 15px;
  height: 2px;
  background-color: #c92804;
}

.precio {
  font-size: 2.25em;
}

.euros {
  font-size: 1em;
  align-self: flex-end;
  margin-bottom: 8px;
  margin-left: 5px;
  text-shadow: 1px 1px 1px rgba(1, 1, 1, 0.3);
}
</style>
