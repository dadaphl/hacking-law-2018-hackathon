<template>
  <div class='new-screen screen'>
    <ae-panel>
      <h2>New Document</h2>
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
    </ae-panel>
    <ae-panel>
      <h2>Participants</h2>
      <div class="participants">
        <div v-if='participants.length'>
          <div v-for='p in participants' class="collaborator grid">
            <ae-identity-avatar :address='p.address'/>
          </div>
        </div>
        <p v-else-if='!inAddMode'>
          add some participants to your document
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
            add collaborator
          </ae-button>
        </div>
      </div>
    </ae-panel>
    <div class="center">
      <ae-button type='dramatic' @click="save">save and sign document</ae-button>
    </div>
  </div>
</template>

<script>
import {
  AeButton,
  AeIcon,
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
    AeIcon,
    AeAddressInput,
    AeDivider,
    AePanel
  },
  data () {
    return {
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
    save () {
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
