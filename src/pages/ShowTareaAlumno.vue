<template>
  <q-page class="auth-container">
    <h3>Tarea</h3>
    <div class="items-list">
      <h4>{{ this.tarea.nombre}}</h4>
      <h5>{{ this.tarea.descripcion}}</h5>
      <q-section v-if="this.entregada == 'true' || this.entregada == true">
        <h5>Esta tarea ya ha sido entregada</h5>
        <q-section v-if="this.nota < 0">
          <h5>Esperando calificación...</h5>
        </q-section>
        <q-section v-else>
          <h5>calificación: {{ this.nota }}/10</h5>
          <h5>Comentario: {{ this.comentario }}</h5>
        </q-section>
      </q-section>
      <q-section v-else>
        <q-uploader
          style=""
          label="Documento"
          auto-upload
          multiple="false"
          max-files="1"
          :factory="setFile"
          @rejected="onRejected"
        />

      </q-section>
    </div>

    <div class="btns-container">
      <span class="volverbtn display-block" @click="goBack">Volver</span>
      <span class="volverbtn display-block" style="margin-left:20px" @click="submitForm">Subir tarea</span>
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
      cursoid: "",
      tareaid: "",
      tarea : {},
      file : '',
      server : 'http://localhost:3000/public/',
      error: 'no carga',
      bloqueid : '',
      userid : '',
      entregada : false,
      nota: -1,
      comentario: '',
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
    loadTarea(){
      let url = "/material/" + this.cursoid + '/' + this.tareaid
      if (this.bloqueid != '' && this.bloqueid != undefined){
        console.log('change url' + this.bloqueid)
        url = "/material/" + this.cursoid + '/' + this.bloqueid + '/' +  this.tareaid
      }
      console.log('url: ' + url)
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get(url, config )
        .then((response) => {
          this.error = ''
          this.tarea = response.data.material
        })
        .catch((error) => {
          console.log('erro de load material')
          console.log(error)
        });
    },

    checkEntregada(){
      //this.userid = "kmhHWDypPBcFTqErFSsFazwBpkt2"
      let token = this.$q.localStorage.getItem("eschoolssessiontoken");
      let config = {
        headers: {
          'x-access-token' : token
        }
      }
      api
        .get('/material/checkuploadedtarea/' + this.userid+'/'+this.tareaid, config)
        .then((response) => {
          if (response.status == 200){
            console.log('checkentregada')
            console.log(response)
            this.entregada = response.data.entregada
            this.nota = response.data.nota
            this.comentario = response.data.comentario
          }
        })
        .catch((error) => {
          console.log('erro de check entregada.')
          console.log(error)
        });
    },

    goBack() {
      this.$router.push("/curso/miscursos/"+ this.id);
    },

    submitForm(){
      if(this.file != ''){
        let formData = new FormData()
        formData.append('userid', 'kmhHWDypPBcFTqErFSsFazwBpkt2')
        formData.append('tarea', this.tareaid);
        formData.append('entrega', this.file)
        api
        .post('/material/uploadTarea', formData )
        .then((response) => {
          if (response.status == 200){
            console.log('Subida la tarea')
            console.log(response)
          } else {
            console.log('NO SE HA SUBIDO')
          }
        })
        .catch((error) => {
          console.log('erro de load material')
          console.log(error)
        });

      }

    },
    setFile(files){
      console.log('a b c')
      console.log(files)
      //console.log(e)
      this.file = files[0]
    },

  },

  mounted() {
    if (this.$route.query.bloqueid != '') {
      console.log(' a v c')
      console.log(this.$route)
      this.bloqueid = this.$route.query.bloqueid
    }
    this.cursoid = this.$router.currentRoute._value.params.id;
    this.tareaid = this.$router.currentRoute._value.params.idtarea;
    this.loadTarea();
    this.checkEntregada();
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
