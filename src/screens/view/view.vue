<template>
  <div>
    <h1>Document {{id}}</h1>

    <div class="document" v-if='document'>
      <version v-for='v, i in document.versions' :version='v' :vnum='i'/>
      <ae-panel>
        <h2>Create new Version</h2>
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
        <br/>
        <div class="center">
          <ae-button type='dramatic' @click="save">save and sign version</ae-button>
        </div>
      </ae-panel>
    </div>
  </div>
</template>
<script>
import {
  AeButton,
  AeIdentityAvatar,
  AePanel
} from '@aeternity/aepp-components'
import Version from '../../components/version/version.vue'
export default {
  components: {
    Version,
    AeButton,
    AeIdentityAvatar,
    AePanel
  },
  data () {
    return {
      config: {
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      model: '',
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    document () {
      return Object.values(this.$store.state.documents).filter(doc => doc.id === this.id)[0]
    }
  },
  methods: {
    save () {
      this.$store.dispatch('addVersion', {
        content: this.model,
        documentId: this.id
      })
    }
  }
}
</script>
