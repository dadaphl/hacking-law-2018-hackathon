<template>
  <div>
    <h1>Your Agreements</h1>
    <p v-if='!documents.length' class='center'>
       You dont have any Agreements yet, create one
    </p>
    <div class="center">
      <ae-button type='dramatic' to='/new'>
        Create new Agreement
      </ae-button>
    </div>
      <div v-if='documents' >
        <docprev v-for='d in documents' :document='d' />
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
import { mapState } from 'vuex'
import Docprev from '../../components/docprev/docprev.vue'
export default {
  components: {
    AeButton,
    AeDivider,
    AeIdentityAvatar,
    AePanel,
    Docprev
  },
  computed: mapState({
    documents: state => Object.values(state.documents)
  })
}
</script>
