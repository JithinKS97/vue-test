<template>
  <q-page>
    <Form v-bind:characterData="characterData" title="Max"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Form from '../components/Form'

export default defineComponent({
  name: 'PageMax',
  data() {
      return {
          characterData:{}
      }
  },
  components: {
    Form
  },
  mounted() {
     fetch('https://mocki.io/v1/ac05988f-e2e5-42f9-8088-9da6979926e3')
      .then(async response => {
        this.characterData = await response.json()
      })
  },
  props: {
    data: {
      type:Object
    }
  }
})
</script>
