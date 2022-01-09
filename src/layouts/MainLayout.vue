<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar class="toolbar">
        <div toolbar-container>
          <router-link to="/">
            <q-btn color="secondary">Home</q-btn>
          </router-link>
          <router-link to="/max">
            <q-btn color="secondary">Max</q-btn>
          </router-link>
          <router-link to="/kleed">
            <q-btn color="secondary">Kleed</q-btn>
          </router-link>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      
    }
  }
})
</script>

<style scoped>
  .toolbar {
    display: flex;
    justify-content: center;
  }
  .header {
    width: 70vw;
    min-width: 500px;
    margin:auto;
  }
  .toolbar button {
    margin-left: 20px;
  }
  .toolbar a {
    text-decoration: none;
  }
  .container {
    background-color: white;
    filter: drop-shadow(0 -6mm 4mm grey);
    width: 70vw;
    min-width: 500px;
    margin: auto;
  }
</style>
