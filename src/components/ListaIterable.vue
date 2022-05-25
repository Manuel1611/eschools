<template>
  <q-dialog
    v-model="openAuxEditDelete"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="background-myblue text-white" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Has seleccionado un material</div>
      </q-card-section>

      <q-card-section style="font-size: 1.1em" class="q-pt-none">
        {{ this.nombreMatAux }}
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-white text-teal logoutModal-margins"
      >
        <div class="logout-btn-no-cerrar" v-close-popup>Cerrar</div>
        <div
          class="logout-btn-yes-edit"
          v-close-popup
          @click="goEdit(this.indexToDeleteAux)"
        >
          Editar
        </div>
        <div
          class="logout-btn-yes-delete"
          v-close-popup
          @click="
            openBorrarMaterial = true;
            this.nombreMat = this.nombreMatAux;
            this.indexToDelete = this.indexToDeleteAux;
          "
        >
          Borrar
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="openBorrarMaterial"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="background-myblue text-white" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Estás a punto de mandar algo a la basura...</div>
      </q-card-section>

      <q-card-section style="font-size: 1.1em" class="q-pt-none">
        {{ this.nombreMat }}
      </q-card-section>

      <q-card-actions
        align="right"
        class="bg-white text-teal logoutModal-margins"
      >
        <div class="logout-btn-no" v-close-popup>Cancelar</div>
        <div
          class="logout-btn-yes"
          v-close-popup
          @click="deleteMaterial(this.indexToDelete)"
        >
          Aceptar
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-list>
    <q-item
      v-for="(item, index) in material"
      :key="index"
      class="item-container"
    >
      <q-item v-if="item.tipo == 'enlace'" class="tipo">
        <q-item-section avatar class="logo-item">
          <q-icon class="icon-drawer" color="grey-6" name="fa-solid fa-link" />
        </q-item-section>

        <q-item-section
          ><a class="enlace width-quetoca" :href="item.data" target="_blank">
            {{ item.nombre }}
          </a>
          <span class="masinfo">(Haz click arriba para acceder al enlace)</span>
        </q-item-section>
      </q-item>

      <q-item v-else-if="item.tipo == 'archivo'" class="tipo">
        <q-item-section avatar class="logo-item">
          <q-icon class="icon-drawer" color="grey-6" name="fa-solid fa-file" />
        </q-item-section>

        <q-item-section>
          <a
            class="enlace width-quetoca"
            :href="this.$serverapi + this.cursoid + '/' + item.file"
            target="_blank"
          >
            {{ item.nombre }}</a
          >
          <span class="masinfo"
            >(Haz click arriba para ver el documento o descargarlo)</span
          >
        </q-item-section>
      </q-item>

      <q-item class="bloque-container" v-else-if="item.tipo == 'bloque'">
        <q-item-section class="nombre-bloque-container">
          <q-icon
            class="icon-drawer toShow"
            color="black"
            name="fa-solid fa-angle-right"
          />
          <p class="nombre-bloque">{{ item.nombre }}</p>
        </q-item-section>
        <div class="dentro-bloque">
          <div class="dentro-bloque-flecha">
            <q-icon
              class="icon-drawer rotar"
              color="grey-6"
              name="fa-solid fa-arrow-turn-up"
            />
          </div>
          <ListaIterable
            style="background-color: red"
            :profesor="this.profesor"
            :material="item.material"
            :cursoid="this.cursoid"
            :bloque="index"
            :uid="this.uid"
          />
        </div>
      </q-item>
      <q-item v-else-if="item.tipo == 'tarea'" class="tipo">
        <q-item-section avatar class="logo-item">
          <q-icon
            class="icon-drawer"
            color="grey-6"
            name="fa-solid fa-file-pen"
          />
        </q-item-section>

        <q-item-section v-if="this.profesor == true"
          ><a class="enlace" @click="goTareaProfesor(index)">
            {{ item.nombre }}
          </a>
        </q-item-section>
        <q-item-section v-else
          ><a class="enlace" @click="goTarea(index)"> {{ item.nombre }} </a>
        </q-item-section>
      </q-item>
      <q-item-section side v-if="this.profesor == true" class="btns-prof">
        <q-item-section>
          <q-avatar
            style="cursor: pointer; font-size: 2em"
            @click="goEdit(index)"
            icon="fa-solid fa-pencil"
            color="primary"
            text-color="white"
          />
        </q-item-section>
        <q-item-section>
          <q-avatar
            style="cursor: pointer; font-size: 2em"
            @click="
              this.indexToDelete = index;
              openBorrarMaterial = true;
              this.nombreMat = item.nombre;
            "
            icon="fa-solid fa-trash-can"
            color="negative"
            text-color="white"
          />
        </q-item-section>
        <q-item-section
          class="novisibleaalumnos"
          v-if="item.visible === 'false' || item.visible == false"
        >
          <q-icon
            class="icon-drawer"
            color="grey-8"
            name="fa-solid fa-eye-slash"
          />
        </q-item-section>
      </q-item-section>
      <q-item-section side v-if="this.profesor == true" class="btns-prof2">
        <q-icon
          class="activate-bubble"
          @click="
            openAuxEditDelete = true;
            this.nombreMatAux = item.nombre;
            this.indexToDeleteAux = index;
          "
          name="info"
          color="primary"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { api } from "boot/axios";
export default {
  name: "ListaIterable",
  setup() {
    return {};
  },
  data() {
    return {
      openBorrarMaterial: false,
      indexToDelete: 0,
      nombreMat: "",
      openAuxEditDelete: false,
      nombreMatAux: "",
      indexToDeleteAux: 0,
    };
  },
  props: {
    material: {
      type: Array,
      required: true,
    },
    profesor: {
      type: Boolean,
      default: false,
    },
    cursoid: {
      type: String,
      required: true,
    },
    //server: {
    //  type: String,
    //  default: "http://localhost:3000/public/",
    //},
    bloque: {
      type: String,
      default: "",
    },
    uid: {
      type: String,
      default: "",
    },
  },
  methods: {
    goTarea(id) {
      this.$router.push({
        path: "/curso/miscursos/" + this.cursoid + "/tarea/" + id,
        query: {
          bloqueid: this.bloque,
        },
      });
    },
    goTareaProfesor(id) {
      this.$router.push({
        path: "/curso/tarea/" + this.cursoid + "/" + id,
        query: {
          bloqueid: this.bloque,
        },
      });
    },
    goEdit(id) {
      this.$router.push({
        path: "/curso/" + this.cursoid + "/material/" + id + "/edit",
        query: {
          bloqueid: this.bloque,
        },
      });
    },
    deleteMaterial(idmaterial) {
      let data = {
        curso: this.cursoid,
        materialid: idmaterial,
        bloqueid: this.bloque,
      };
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          "x-access-token": token,
        },
      };
      api
        .post("material/deletematerial/", data, config)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);
            // this.$parent.loadCurso();
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.item-container {
  display: flex;
  justify-content: space-between;
  border: 2px solid #e8e8e8;
  padding: 15px;
  padding-bottom: 40px;
  padding-top: 40px;
  margin: 5px 0;
}

.btns-prof {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  position: relative;
}

.btns-prof::before {
  content: "";
  position: absolute;
  height: calc(100% + 80px);
  width: 2px;
  background-color: #e8e8e8;
  left: -20px;
}

.btns-prof > div {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0 8px;
}

.logo-item {
  position: relative;
  top: -40px;
  left: -20px;
}

.logo-item::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 2px;
  background-color: #e8e8e8;
  transform: rotate(90deg);
  top: 15px;
  left: 25px;
}

.enlace {
  font-size: 1.1em;
  text-decoration: none;
  color: black;
  cursor: pointer;
}

.enlace:hover {
  text-decoration: underline;
}

.masinfo {
  font-size: 0.9em;
  color: rgba(1, 1, 1, 0.6);
}

.bloque-container {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.nombre-bloque-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.nombre-bloque {
  margin: 0;
  font-size: 1.5em;
  margin-left: 10px;
}

.dentro-bloque {
  display: flex;
}

.dentro-bloque-flecha {
  width: 100px;
  display: flex;
  justify-content: center;
}

.rotar {
  transform: rotate(90deg);
  font-size: 1.8em;
}

.width-quetoca {
  width: fit-content;
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

.logout-btn-no-cerrar,
.logout-btn-yes-edit,
.logout-btn-yes-delete {
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

.logout-btn-no-cerrar {
  background-color: #8f8f8f;
  transition: 0.2s ease;
}

.logout-btn-yes {
  background-color: #21ba45;
  transition: 0.2s ease;
}

.logout-btn-yes-edit {
  background-color: #1976d2;
  transition: 0.2s ease;
}

.logout-btn-yes-delete {
  background-color: #c10015;
  transition: 0.2s ease;
}

.logout-btn-no:hover {
  background-color: #f24141;
}

.logout-btn-no-cerrar:hover {
  background-color: #a6a4a4;
}

.logout-btn-yes:hover {
  background-color: #30c954;
}

.logout-btn-yes-edit:hover {
  background-color: #2785e3;
}

.logout-btn-yes-delete:hover {
  background-color: #d90f25;
}

.dentro-bloque .q-list {
  width: 100%;
}

.novisibleaalumnos {
  position: absolute;
  top: -25px;
  right: -5px;
}

.btns-prof2 {
  display: none;
}

.activate-bubble {
  cursor: pointer;
}

@media (max-width: 1500px) {
  .toShow {
    display: none;
  }
}

@media (max-width: 1250px) {
  .btns-prof {
    display: none;
  }

  .btns-prof2 {
    display: block;
    position: absolute;
    right: -8px;
    top: 7px;
  }
}

@media (max-width: 1079px) {
  .bloque-container {
    width: 100%;
    padding: 0;
  }

  .dentro-bloque-flecha {
    margin-left: -20px;
  }

  .logo-item::before {
    left: 15px;
  }

  .q-list {
    margin-left: -20px;
    margin-right: -10px;
  }
}
</style>
