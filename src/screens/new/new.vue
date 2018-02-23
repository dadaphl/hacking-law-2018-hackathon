<template>
  <div class='new-screen screen'>
    <ae-panel>
      <h2>New Agreement</h2>
      <froala :tag="'textarea'" :config="config" v-model="model"></froala>
    </ae-panel>
    <ae-panel>
      <h2>Participants</h2>
      <div class="participants">
        <div v-if='participants.length'>
          <div class='author grid' v-for='s in participants'>
            <div><ae-identity-avatar :address='s.address'/></div>
            <div>{{s.address}}</div>
          </div>
        </div>
        <p v-else-if='!inAddMode'>
          add some participants to your Agreement
        </p>

        <div class='add-collaborator' v-if='inAddMode'>
          <div class="grid">
            <div>
              <ae-identity-avatar :address='newCollabAddress'/>
            </div>
            <div>
              <ae-address-input data-vv-validate-on='blur' v-validate='"min:42"' name='newCollabAddress' v-model='newCollabAddress'/>
            </div>
            <div>
              <ae-button type='boring' @click="cancelCollab">cancel</ae-button>
              <ae-button type='dramatic' @click="saveCollab">save</ae-button>
            </div>
          </div>
          <span v-show="errors.has('newCollabAddress')">{{ errors.first('newCollabAddress') }}</span>
        </div>

        <div v-if='!inAddMode' class="center">
          <ae-button @click='switchToAddMode' type='exciting'>
            <ae-icon invert type='exciting' name='plus' slot='icon'/>
            Add Participant
          </ae-button>
        </div>
      </div>
    </ae-panel>
    <div class="center">
      <ae-button v-if='!loading' type='dramatic' @click="save">Save and Sign Agreement</ae-button>
      <ae-loader v-else />
    </div>
  </div>
</template>

<script>
import {
  AeButton,
  AeIcon,
  AeLoader,
  AeIdentityAvatar,
  AeTextarea,
  AeAddressInput,
  AeDivider,
  AePanel
} from '@aeternity/aepp-components'
export default {
  components: {
    AeButton,
    AeTextarea,
    AeIdentityAvatar,
    AeLoader,
    AeIcon,
    AeAddressInput,
    AeDivider,
    AePanel
  },
  data () {
    return {
      loading: false,
      inAddMode: false,
      newCollabAddress: '',
      config: {
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      model: '',
      participants: []
    }
  },
  computed: {
  },
  methods: {
    async save () {
      this.loading = true
      await this.$store.dispatch('createDocument', {
        content: this.model,
        authors: this.participants.map(a => a.address)
      })
      this.loading = false
      this.$router.push({
        name: 'Index'
      })
    },
    switchToAddMode () {
      this.inAddMode = true
    },
    async saveCollab () {
      if (!await this.$validator.validateAll()) return
      this.inAddMode = false
      this.participants.push({
        address: this.newCollabAddress
      })
      this.newCollabAddress = ''
    },
    cancelCollab () {
      this.inAddMode = false
    }
  },
  created () {
  }
}
</script>
<style src='./new.scss' lang='scss' />
