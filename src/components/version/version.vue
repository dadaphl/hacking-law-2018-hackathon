<template>
  <ae-panel>
    <h2>Version {{vnum+1}}</h2>
    <ae-divider />
      <div v-html='version.content' />
        <ae-divider />
      signedBy:
      <div class='author grid' v-for='s in version.signedBy'>
        <div><ae-identity-avatar :address='s'/></div>
        <div>{{s}}</div>
      </div>
      <div v-if='!signedByYou' class="center">
        <ae-button type='dramatic'>
          sign
        </ae-button>
      </div>
  </ae-panel>
</template>
<script>
import {
  AeButton,
  AeDivider,
  AeIdentityAvatar,
  AePanel
} from '@aeternity/aepp-components'
export default {
  components: {
    AeButton,
    AeDivider,
    AeIdentityAvatar,
    AePanel
  },
  props: [
    'version',
    'vnum'
  ],
  computed: {
    myAddress () {
      return this.$store.state.account
    },
    signedByYou () {
      return this.version.signedBy.indexOf(this.myAddress) > -1
    }
  }
}
</script>
