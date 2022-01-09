<template> 
  <div class="title">
    <h4>{{title}}</h4>
  </div>
  <div class="outer-container">
    <div class="form-container">
        <q-input v-model="nam" label="Name"></q-input>
        <q-input v-model="race" class="race" label="Race"></q-input>
        <q-input v-model="height" class="height" label="Height"></q-input>
        <div class="autofarm">
            <label>Autofarm</label>
            <q-checkbox left-label v-model="autofarm" />
        </div>
        <div class="q-pa power">
            <label>Power ({{ power/100 }})</label>
            <q-slider v-model="power" :min="0" :max="10000"/>
        </div>
        <div v-if="magicLevel!=null" class="q-pa power">
            <label>Magic level ({{ magicLevel }})</label>
            <q-slider :step="1" v-model="magicLevel" :min="0" :max="100"/>
        </div>
        <div v-if="greedLevel!=null" class="q-pa power">
            <label>Greed level ({{ greedLevel }})</label>
            <q-slider :step="1" v-model="greedLevel" :min="0" :max="100"/>
        </div>
        <div class="submit-button">
            <q-btn v-on:click="get" color="secondary">Download YAML</q-btn>
        </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { exportFile } from 'fs-browsers';

const YAML = require('yaml');

export default defineComponent({
  name: 'EssentialLink',
  data() {
      return {
          power:5000,
          autofarm:true,
          magicLevel:25,
          greedLevel:25,
          nam:"",
          race:"",
          height:""
      }
  },
   props: {
    title: {
      type: String,
      required: true
    },
    characterData: {
        type:Object,
        required:false,
    }
  },
  methods: {
    get: function() {
        const jsonObject = {
            power: this.power/100,
            autofarm: this.autofarm,
            "magic-level": this.magicLevel,
            "greed-level": this.greedLevel,
            name: this.nam,
            race: this.race,
            height: this.height
        }
        const doc = new YAML.Document();
        doc.contents = jsonObject;
        exportFile(doc.toString(), { fileName:"character.yaml" });
    }
  },
  watch: {
      characterData() {
          this.race = this.characterData[0].value
          this.height = this.characterData[1].value
          this.nam = this.characterData[2].value
          this.power = this.characterData[3].value * 100
          this.autofarm = this.characterData[4].value
          this.magicLevel = this.characterData[5].value
          this.greedLevel = this.characterData[6].value
      }
  }
})
</script>

<style scoped>
    .height {
        margin-top:20px
    }
    .race {
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
    .submit-button {
        margin-top:30px;
        display: flex;
        justify-content: center;
    }
</style>