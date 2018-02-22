<template>
  <div class='index-screen screen'>

    <ae-textarea v-model="foo" id=""/>

    <div v-for='p in participants' class="grid">
      <ae-identity-avatar :address='p.address'/>
      <ae-address-input v-model='p.address' :address='p.address'/>
    </div>

    <ae-button @click='add' type='exciting'>
      <ae-icon invert type='exciting' name='plus' slot='icon'/>
      add more
    </ae-button>
    <ae-divider />
    <ae-button @click="save">save</ae-button>
  </div>
</template>

<script>
import {
  AeButton,
  AeIcon,
  AeIdentityAvatar,
  AeTextarea,
  AeAddressInput,
  AeDivider
} from '@aeternity/aepp-components'
export default {
  data () {
    return {
      foo: 'asdasd',
      participants: [{
        address: ''
      }]
    }
  },
  components: {
    AeButton,
    AeTextarea,
    AeIdentityAvatar,
    AeIcon,
    AeAddressInput,
    AeDivider
  },
  computed: {
  },
  methods: {
    save () {
      alert(this.foo)
    },
    add () {
      this.participants.push('')
    }
  },
  created () {
  }
}
</script>
<style src='./index.scss' lang='scss' />
