<template>
  <ae-panel>
    <h2>Version {{vnum+1}}</h2>
    <ae-divider />
      <div v-html='version.content' />
        <ae-divider />
      <h3>signed by:</h3>
      <div class='author grid' v-for='s in version.signedBy'>
        <div><ae-identity-avatar :address='s'/></div>
        <div>{{s}}</div>
      </div>
      <ae-divider />

      <div v-if='waitingFor.length > 0'>
        <h3>waiting for signature</h3>
        <div class='author grid' v-for='s in waitingFor'>
          <div><ae-identity-avatar :address='s'/></div>
          <div>{{s}}</div>
        </div>
      </div>
      <div v-else>
        <p>
          All parties signed this version
        </p>
      </div>

      <div v-if='!signedByYou'>
        <p>
          Your signature is required
        </p>
        <div class="center">
          <ae-button @click='sign' type='dramatic'>
            sign
          </ae-button>
        </div>
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
    'documentId',
    'version',
    'vnum'
  ],
  computed: {
    myAddress () {
      return this.$store.state.account
    },
    document () {
      return Object.values(this.$store.state.documents).filter(d => d.id === this.documentId)[0]
    },
    waitingFor () {
      return this.document.authors.filter(a => !this.version.signedBy.includes(a))
    },
    signedByYou () {
      return this.version.signedBy.indexOf(this.myAddress) > -1
    }
  },
  methods: {
    sign () {
      this.$store.dispatch('signVersion', {
        documentId: this.documentId,
        versionId: this.vnum
      }).then(f => {
      })
    }
  }
}
</script>
