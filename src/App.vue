<template>
  <div id="app">
    <!--<nav>-->
      <!--<div class="inner">-->
        <!--<router-link class='logo' to='/'>-->
          <!--<span>docsign</span>-->
        <!--</router-link>-->
      <!--</div>-->
    <!--</nav>-->
    <ae-panel>
      <h2>Your Account</h2>
      <ae-identity-avatar :address='myAddress'/>
        {{myAddress}}
    </ae-panel>
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
