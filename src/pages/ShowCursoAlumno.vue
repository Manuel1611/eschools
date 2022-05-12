<template>
  <q-page class="auth-container">
    <h3>Show Cursos Alumno</h3>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.curso.nombre"
        :disabled="this.isDisabled"
      />
    </div>
    <div></div>
    <div>
      <input
        type="text"
        :class="this.show ? 'isShow' : 'isEdit'"
        v-model="this.curso.descripcion"
        :disabled="this.isDisabled"
      />
    </div>
    <div class="items-list">
      <h4>Material del curso</h4>
      <ListaIterable
        :material="this.curso.material"
        :cursoid="this.id"
        />
      <h4>Examen</h4>
      <q-list bordered>
        <q-item v-for="(item, index) in curso.examen" :key="index"  clickable v-ripple>
          <q-item-section>
            <a @click="goExamen(index)">{{item.titulo}}</a>
          </q-item-section>
        </q-item>

      </q-list>



    </div>

    <div class="btns-container">
      <span class="volverbtn display-block" @click="goBack">Volver</span>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

import ListaIterable from "../components/ListaIterable.vue"


export default defineComponent({
    components: { ListaIterable },
    lista: "hola,",
    name: "RegisterPage",
    data() {
        return {
            id: "",
            curso: {},
            show: true,
            isDisabled: true,
            defaultValues: {
                nombre: "",
                apellidos: "",
                rol: "",
            },
            material: {},
            server: "http://localhost:3000/public/"
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
        loadCurso() {
            let cursos;
            api
                .get("/curso/" + this.id)
                .then((response) => {
                console.log("conexion correcta");
                if (response.status == 200) {
                    console.log("conexion correcta2");
                    console.log(response.data);
                    cursos = response.data.curso;
                    this.curso = cursos;
                    console.log(this.curso);
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
        goTarea(id) {
            console.log("go tarea: " + id);
            this.$router.push("/curso/miscursos/" + this.id + "/" + id);
        },
        goExamen(id) {
            console.log("go examen: " + id);
            //this.$router.push("/curso/miscursos");
        }
    },
    mounted() {
        this.id = this.$router.currentRoute._value.params.id;
        this.loadCurso();
    },

});
</script>

<style scoped>
.btns-container {
  margin-top: 10px;
}
.volverbtn {
  background-color: #1c5785;
  padding: 5px;
  margin-top: 10px;
  color: white;
  cursor: pointer;
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
