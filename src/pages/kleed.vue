<template>
  <q-page>
    <Form v-bind:characterData="characterData" title="Kleed"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Form from '../components/Form'

export default defineComponent({
  name: 'PageKleed',
  data() {
      return {
          characterData:{}
      }
  },
  components: {
    Form
  },
  mounted() {
     fetch('https://mocki.io/v1/a980d3fd-7eac-4450-a2fb-aa3be3ee01d6')
      .then(async response => {
        this.characterData = await response.json()
      }).catch(err=>{
        console.log(err)
        alert("error while fetching data from API")
      })
  },
  props: {
    data: {
      type:Object
    }
  }
})
</script>
