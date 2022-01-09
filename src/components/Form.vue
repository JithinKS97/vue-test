<template> 
  <div class="title">
    <h4>{{title}}</h4>
  </div>
  <div class="outer-container">
    <div class="form-container">
        <q-input label="Race"></q-input>
        <q-input class="height" label="Height"></q-input>
        <q-input class="name" label="Name"></q-input>
        <div class="autofarm">
            <label>Autofarm</label>
            <q-checkbox left-label v-model="left" />
        </div>
        <div class="q-pa power">
            <label>Power ({{ standard }})</label>
            <q-slider v-model="standard" :min="0" :max="50"/>
        </div>
        <div class="q-pa power">
            <label>Magic level ({{ magicLevel }})</label>
            <q-slider :step="1" v-model="magicLevel" :min="0" :max="50"/>
        </div>
        <div class="q-pa power">
            <label>Greed level ({{ greedLevel }})</label>
            <q-slider :step="1" v-model="greedLevel" :min="0" :max="50"/>
        </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  data() {
      return {
          standard:25,
          left:true,
          magicLevel:25,
          greedLevel:25
      }
  },
   props: {
    title: {
      type: String,
      required: true
    },
  }
})
</script>

<style scoped>
    .height {
        margin-top:20px
    }
    .name {
        margin-top:20px
    }
    .power {
        margin-top:20px;
    }
    .form-container {
        width:50vw;
    }
    .outer-container {
        display: flex;
        justify-content: center;
    }
    .title {
        display: flex;
        justify-content: center;
    }
    .autofarm {
        margin-top:20px;
    }
</style>