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
      return [
        {
          authors: ['0x92e50fFf3e036a4674FE5b2Bc40Fe910777aDe85'],
          versions: [
            {
              content: 'Ipsum cupiditate quos cumque nesciunt possimus? Consequuntur quod itaque delectus error rem Nostrum ex at rerum et veritatis. Dignissimos mollitia maxime nam illum ipsum Laboriosam ducimus enim mollitia quis atque.',
              signedBy: ['0x92e50fFf3e036a4674FE5b2Bc40Fe910777aDe85']
            }
          ]
        }
      ]
      //return this.$store.state.documents
    }
  }
}
</script>
