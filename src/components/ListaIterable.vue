<template>
  <div>My component</div>




<!--
  <q-list bordered>

    <q-item v-for="(item, index) in curso.material" :key="index"  clickable v-ripple>

      <q-item-section>{{ item.visible }}</q-item-section>
      <q-item v-if="item.visible == true || item.visible == 'true' ">
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


            <a :href="this.server + this.id + '/' + item.file" target="_blank"> {{ item.nombre }}</a>
          </q-item-section>

        </q-item>

        <q-item  v-else-if="item.tipo == 'bloque'">
          <q-item-section avatar>
            <q-icon class="icon-drawer" color="white" name="fa-solid fa-chess-knight" />
            <h4>{{ item.nombre }} </h4>

              <q-item v-for="(item2, index2) in item.material" :key="index2"  clickable v-ripple>
                <p>{{item2.nombre }}</p>
              </q-item>

          </q-item-section>
        </q-item>
        <q-item  v-else-if="item.tipo =='tarea'">
          <q-item-section avatar>
          <q-icon
            class="icon-drawer"
            color="white"
            name="fa-solid fa-pencil"
          />
          </q-item-section>

          <q-item-section><a @click="goTarea(index)" target="_blank"> {{ item.nombre }} </a> </q-item-section>
        </q-item>
      </q-item>
    </q-item>
  </q-list>
-->
</template>

<script>
export default {
  name: 'ListaIterable',
  setup () {
    return {}
  }
}
</script>
