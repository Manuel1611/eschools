<template>
  <q-page class="auth-container">
    <h3>Show Cursos Not Admin</h3>
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
        :profesor="true"
        :material="this.curso.material"
        :cursoid="this.id"
      />
    </div>

    <div class="btns-container">
      <span class="volverbtn display-block" @click="goBack">Volver</span>
      <br /><br />
      <span class="volverbtn display-block" @click="goAddMaterial"
        >Añadir Material</span
      >
      <br /><br />
      <span class="volverbtn display-block" @click="goAddExamen"
        >Añadir Examen</span
      >
      <br /><br />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import ListaIterable from "src/components/ListaIterable.vue";

export default defineComponent({
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
            this.$router.push("/curso/");
        },
        goAddMaterial() {
            this.$router.push("/curso/" + this.id + "/material/add");
        },
        goAddExamen() {
            this.$router.push("/curso/" + this.id + "/examen/add");
        },
        goEdit(index) {
            this.$router.push("/curso/" + this.id + "/material/" + index + "/edit");
        },
    },
    mounted() {
        this.id = this.$router.currentRoute._value.params.id;
        this.loadCurso();
    },
    components: { ListaIterable }
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
