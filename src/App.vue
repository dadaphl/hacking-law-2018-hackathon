<template>
  <div id="app">
    <ae-panel class='your-account'>
      <strong>Your Account</strong>
      <div class="author grid">
        <div>

          <ae-identity-avatar :address='myAddress'/>
        </div>
        <div>
        {{myAddress}}
        </div>
      </div>
      </ae-panel>
    <nav>
      <router-link to='/'>Home</router-link>
      <router-link to='/new'>New Agreement</router-link>
    </nav>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import {
  AePanel,
  AeIdentityAvatar
} from '@aeternity/aepp-components'
export default {
  name: 'app',
  components: {
    AePanel,
    AeIdentityAvatar
  },
  computed: {
    myAddress () {
      return this.$store.state.account
    }
  }
}
</script>

<style src='./App.scss' lang='scss' />
