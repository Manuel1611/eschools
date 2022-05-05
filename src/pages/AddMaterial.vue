<template>
  <q-page>
    <h3>Añadir Material</h3>
    <h4>Honor no está muerto mientras permanezca en el corazón de los hombres </h4>
    <div class="form-container">
      <div>
        <div class="bar"></div>
        <div class="form">
          <form ref="form">
            <div>
              <label for="">Nombre</label>
              <input type="text" name="name" v-model="material.name" />
            </div>
            <div>
              <label for="">Tipo</label>
              <select v-model="material.type">
                <option name="enlace">Enlace</option>
                <option name="pdf">PDF</option>
                <option name="tarea">Tarea</option>
              </select>
            </div>

            <div>
              <label>Material</label>

              <input v-model="material.data" type="text">
              <!--v-model="file" -->
              <q-uploader
                style=""
                label="Documento"
                auto-upload
                multiple="false"
                max-files="1"
                :factory="setFile"
                @rejected="onRejected"
              />


              <!--<q-file

                @value="file"
                @update:model-value="setFile()"
                label="Pick one file"
                filled

                style="max-width: 300px"
              />-->
            </div>

            <div>
              <label for="">Visible</label>
              <input v-model="material.visible" type="checkbox">
            </div>
            <div>
              <input
                class="form-btn"
                type="button"
                name="button"
                @click="submitForm"
                value="Añadir material"


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
import { ref } from 'vue'

export default defineComponent({
  name: "AdminAddUser",
  data() {
    return {
        material: {
          name: "",
          type: "",
          data: "",
          visible: true,
      },
        id: "",
        file : ref(null),
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
      this.$router.push("/curso");
    },

    submitForm() {

      if (
        this.material.name != "" &&
        this.material.type != "" &&
        //this.material.data != "" &&
        this.material.visible != "" &&
        this.id != ""
      ) {
        console.log('asdf')
        let formData = new FormData()
        formData.append('nombre', this.material.name);
        formData.append('tipo', this.material.type);
        formData.append('visible', this.material.visible);
        formData.append('curso', this.id);

        if (this.material.type == 'Enlace'){
          formData.append('data', this.material.data);
        } else if (this.material.type == 'PDF'){
          formData.append('file', this.file);
        }


        api
          .post("/material/store", formData)
          .then((response) => {
            //this.$router.push("/auth");
            this.registerOk("Material añadido");
          })
          .catch(() => {
            this.registerError("No se ha podido añadir el curso");
          });
      } else {
        this.registerError("Todos los campos son obligatorios");
      }




    },
    submitFormtest(){
      console.log('submitFile')
      console.log(this.file)

      let formData = new FormData()
      formData.append('curso', 'Fisica');
      formData.append('file', this.file);

      let data = {
        file: this.file,
        curso:'fisica',
      }
      api.post( 'http://localhost:3000/material/test',
        formData,
        {
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'multipart/form-data'
          }
        }
      ).then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });

/*
      api.post('material/test', data, headers).then((response) => {
        console.log(response)
      }).catch((e) => {
        console.log(e)
      })
*/
    },

    setFile(files){
      console.log('a b c')
      console.log(files)
      //console.log(e)
      this.file = files[0]
    }

  },

  mounted(){
    this.id = this.$router.currentRoute._value.params.id;
  }
});
</script>

<style scoped>
</style>
