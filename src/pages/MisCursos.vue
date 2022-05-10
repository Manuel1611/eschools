<template>
  <q-page class="auth-container">
    <div class="title">
      <q-icon
        class="icon-drawer"
        color="black"
        name="fa-solid fa-angle-right"
      />
      <div>Mis cursos</div>
    </div>
    <div class="top-info">
      <div class="query-found">
        <!--<q-icon class="icon-drawer" color="white" name="fa-solid fa-hashtag" />-->
        <!--<div>{{ Object.values(this.cursos).length }} resultados</div>-->
      </div>

      <div class="search-container" style="height:50px">
      </div>
    </div>

    <q-list>
      <q-item class="each-item" v-for="(item, index) in cursos" :key="index" @click="goCurso(index)">
        <q-item-section>
          <q-item-label lines="1" style="font-size: 1.1em">{{
            item.nombre + " - " + item.precio + "€"
          }}</q-item-label>
          <q-item-label style="font-size: 1em" caption>{{
            item.descripcion
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-avatar
            style="cursor: pointer"
            @click="goCurso(index)"
            icon="fa-solid fa-book-open-reader"
            color="primary"
            text-color="white"
          />
        </q-item-section>
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
      cursos: {},
      matriculas : {},
    };
  },
  setup() {
    const $q = useQuasar();

    return {};
  },
  methods: {
    loadCurso(index) {
      console.log('CARGANDO CURSO' + index)
      let cursos = [];
      api
        .get("/curso/"+ index)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            let curso = response.data.curso;
            //console.log(curso);
            //this.cursos.push(curso);
            this.cursos[index] = curso
            console.log('this.cursos: ')
            console.log(this.cursos)
            //console.log(Object.values(this.cursos).length );
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
          /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        });
    },
    goCurso(index) {
      this.$router.push("/curso/miscursos/" + index);
    },

    loadMatriculas(userid){
      let matriculas
      api
        .get("/matricula/getmatriculabyuser/"+ userid)
        .then((response) => {
          console.log("conexion correcta");
          if (response.status == 200) {
            console.log("conexion correcta2");
            console.log(response.data);

            matriculas = response.data.matricula;
            console.log(matriculas);
            this.matriculas = matriculas;
            console.log('Matriculas')
            for(let i = 0; i < matriculas.length; i++){
              console.log('curso: ')
              console.log(matriculas[i].idcurso)
              this.loadCurso(matriculas[i].idcurso)
            }
            //console.log(Object.values(this.cursos).length );
          }
        })
        .catch((e) => {
          console.log("error de conexion");
          console.log(e);
          /*$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
            */
        });
    },
  },

  mounted() {
    console.log("mounted");
    this.loadMatriculas("kmhHWDypPBcFTqErFSsFazwBpkt2");
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
</style>
