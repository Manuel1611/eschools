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
              <q-select
                filled
                v-model="material.type"
                :options="options"
                label="Tipo de Material"
              />

<!--
              <select v-model="material.type">
                <option name="enlace">Enlace</option>
                <option name="pdf">PDF</option>
                <option name="tarea">Tarea</option>
                <option name="bloque">Bloque</option>
              </select>
              -->
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
              <label for="">Bloque</label>
              <q-select
                filled
                v-model="material.bloque"
                :options="bloques"
                label="Bloque"
              />
            </div>
            <div>
              <label for="">Descripción de la tarea</label>
              <textarea v-model="descripcion"></textarea>
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
          bloque : '',

      },
        id: "",
        file : ref(null),
        descripcion: '',
        options: [
          {
            label: 'Enlace',
            value: 'enlace'
          },
          {
            label: 'PDF',
            value: 'PDF'
          },
          {
            label: 'Tarea',
            value: 'tarea'
          },
          {
            label: 'Bloque',
            value: 'bloque'
          }

        ],
        bloques: [
          {
            label: '',
            value: '',
          },
        ],

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
      console.log('type: ')
      console.log(this.material.type.value)
      if (
        this.material.name != "" &&
        this.material.type != "" &&
        //this.material.data != "" &&
        //this.material.visible != "" &&
        this.id != ""
      ) {
        console.log('asdf')
        let formData = new FormData()
        formData.append('nombre', this.material.name);
        formData.append('tipo', this.material.type.value);
        formData.append('visible', this.material.visible);
        formData.append('curso', this.id);
        formData.append('bloque', this.material.bloque.value)
        console.log('BLOQUE: ')
        console.log(this.material.bloque.value)
        if (this.material.type.value == 'enlace'){
          formData.append('data', this.material.data);
        } else if (this.material.type.value == 'PDF'){
          formData.append('file', this.file);
        } else if (this.material.type.value == 'tarea'){
          formData.append('descripcion', this.descripcion);
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
    setFile(files){
      console.log('a b c')
      console.log(files)
      //console.log(e)
      this.file = files[0]
    },

    loadBloques(){
      api
        .get("/material/"+this.id +"/bloques")
        .then((response) => {
          console.log('get bloques')
          console.log(response.data)
          let bloques = response.data.bloques

          for (var i in bloques){
            console.log(bloques[i][1])
            this.bloques.push(
              {
                label: bloques[i][1].nombre,
                value: bloques[i][0]
              }
            )
          }
        })
        .catch(() => {

        });
    }

  },

  mounted(){
    this.id = this.$router.currentRoute._value.params.id;
    this.loadBloques()
  }
});
</script>

<style scoped>
</style>
