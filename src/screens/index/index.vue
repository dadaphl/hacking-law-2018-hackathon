<template>
  <div>
    <h1>Your Documents</h1>
      <div v-if='document.length' >
        <docprev v-for='d in document' :document='d' />
      </div>
      <p v-else class='center'>
         You dont have any Documents yet, create one
      </p>
      <div class="center">
        <ae-button type='exciting' to='/new'>
          Create new Document
        </ae-button>
      </div>
  </div>
</template>
<script>
import {
  AeButton,
  AeIdentityAvatar,
  AeDivider,
  AePanel
} from '@aeternity/aepp-components'
import Docprev from '../../components/docprev/docprev.vue'
export default {
  components: {
    AeButton,
    AeDivider,
    AeIdentityAvatar,
    AePanel,
    Docprev
  },
  computed: {
    document () {
      return this.$store.state.documents
    }
  }
}
</script>
