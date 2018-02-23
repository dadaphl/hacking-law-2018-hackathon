<template>
  <div>
    <h1>Document {{id}}</h1>

    <div class="document" v-if='document'>
      <version v-for='v, i in document.versions' :version='v' :vnum='i'/>
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
  computed: {
    id () {
      return this.$route.params.id
    },
    document () {
      return Object.values(this.$store.state.documents).filter(doc => doc.id === this.id)[0]
    }
  }
}
</script>
