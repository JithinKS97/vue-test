<template> 
  <div class="title">
    <h4>{{title}}</h4>
  </div>
  <div class="outer-container">
    <div class="form-container">
        <q-input v-model="nam" label="Name"></q-input>
         <q-btn-dropdown class="race" color="primary" v-bind:label="this.race || 'Select race'">
            <q-list>
                <q-item @click="onItemClick(race)" v-bind:key="race.id" v-for="race in raceData" clickable v-close-popup>
                    <q-item-section>
                        <q-item-label>{{race.id}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>
        <q-input type="number" v-model="height" class="height" label="Height"></q-input>
        <div class="autofarm">
            <label>Autofarm</label>
            <q-checkbox left-label v-model="autofarm" />
        </div>
        <div class="q-pa power">
            <label>Power ({{ power/100 }})</label>
            <q-slider v-model="power" :min="0" :max="10000"/>
        </div>
        <div v-if="shouldDisplayMagicLevel()" class="q-pa power">
            <label>Magic level ({{ magicLevel }})</label>
            <q-slider :step="1" v-model="magicLevel" :min="0" :max="100"/>
        </div>
        <div  v-if="shouldDisplayGreedLevel()" class="q-pa power">
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
          height:"",
          raceData:[]
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
    shouldDisplayMagicLevel() {
        const race = this.raceData.find(datum => datum.id === this.race);
        if(race) {
            return race['hasMagic']
        }
        return true;
    },
    shouldDisplayGreedLevel() {
        const race = this.raceData.find(datum => datum.id === this.race);
        if(race) {
            return race['hasGreed']
        } 
        return true;
    },
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

        if(!this.shouldDisplayMagicLevel()) {
            jsonObject["magic-level"] = null;
        }

         if(!this.shouldDisplayGreedLevel()) {
            jsonObject["greed-level"] = null;
        }

        const doc = new YAML.Document();
        doc.contents = jsonObject;
        exportFile(doc.toString(), { fileName:"character.yaml" });
    },
    onItemClick(e) {
        this.race = e.id
    }
  },
  watch: {
      characterData() {
          const data = {}

          for(let i=0;i<this.characterData.length;i++) {
              data[this.characterData[i]["id"]] = this.characterData[i]["value"];
          }

          this.race = data['race']
          this.height = data['height']
          this.nam = data['name']
          this.power = data['power'] * 100
          this.autofarm = data['autofarm']
          this.magicLevel = data['magic-level']
          this.greedLevel = data['greed-level']
      }
  },
  mounted() {
      fetch("https://mocki.io/v1/b02d1de0-a465-4475-9ebb-94e8118c3757").then(async (res)=>{
        const raceData = await res.json();
        this.raceData = raceData
        console.log(this.raceData)
      })
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
    .race {
        margin-top:20px;
    }
</style>