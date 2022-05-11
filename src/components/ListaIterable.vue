<template>
  <div>My component</div>


      <q-list bordered>

        <q-item v-for="(item, index) in material" :key="index"  clickable v-ripple>
          <q-item  v-if="item.tipo == 'enlace'">
            <q-item-section avatar>
              <q-avatar color="teal" text-color="white" icon="bluetooth" />
            </q-item-section>


            <q-item-section><a :href="item.data" target="_blank"> {{ item.nombre }} </a> </q-item-section>
          </q-item>

          <q-item  v-else-if="item.tipo == 'PDF'">
            <q-item-section avatar>
              <q-icon class="icon-drawer" color="white" name="fa-solid fa-book" />
            </q-item-section>

            <q-item-section>


              <a :href="this.server + this.cursoid + '/' + item.file" target="_blank"> {{ item.nombre }}</a>
            </q-item-section>

          </q-item>

          <q-item  v-else-if="item.tipo == 'bloque'">
            <q-item-section avatar>
              <q-icon class="icon-drawer" color="white" name="fa-solid fa-chess-knight" />
            </q-item-section>

            <q-item-section>
              <h4>{{ item.nombre }} </h4>
            </q-item-section>
            <ListaIterable
              :profesor="this.profesor"
              :material="item.material"
              :cursoid="this.cursoid"
              :bloque="index"
            />
          </q-item>
          <q-item  v-else-if="item.tipo =='tarea'">
            <q-item-section avatar>
            <q-icon
              class="icon-drawer"
              color="white"
              name="fa-solid fa-pencil"
            />
            </q-item-section>

            <q-item-section><a @click="goTarea(index)"> {{ item.nombre }} </a> </q-item-section>
          </q-item>
          <q-item-section v-if="this.profesor == true">
            <br> <br>
            <q-item-section @click="goEdit(index)">Editar </q-item-section>
            <br><br>
            <q-item-section @click="deleteMaterial(index)">Borrar </q-item-section>
            <q-item-section v-if="item.visible === 'false' || item.visible == false"> {{ item.visible}} Material no visible para los alumnos</q-item-section>
          </q-item-section>
        </q-item>
      </q-list>

</template>

<script>

import { api } from "boot/axios";
export default {
  name: 'ListaIterable',
  setup () {
    return {}
  },

  props :{
    material: {
      type: Array,
      required: true
    },
    profesor : {
      type: Boolean,
      default: false
    },
    cursoid: {
      type: String,
      required: true
    },
    server: {
      type: String,
      default: "http://localhost:3000/public/"
    },
    bloque: {
      type: String,
      default : '',
    }

  },
  methods :{
    goTarea(id) {
      this.$router.push({
        path: "/curso/miscursos/" + this.cursoid + "/" + id,
        query: {
          bloqueid: this.bloque
        },
      });
    },
    goEdit(id) {
      this.$router.push({
        path: "/curso/" + this.cursoid + "/material/" + id + "/edit",
        query: {
          bloqueid: this.bloque
        },
      });
    },
    deleteMaterial(idmaterial) {
      let data = {
          cursoid: this.cursoid,
          materialid: idmaterial,
          bloqueid: this.bloque,
      };
      api
          .post("material/deletematerial/", data)
          .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
              console.log("conexion correcta2");
              console.log(response.data);
          }
      })
          .catch((e) => {
          console.log("error de conexion");
          console.log(e);
      });
    }
  }
}
</script>
