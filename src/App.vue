<template>
  <div id="app">
    <!--<nav>-->
      <!--<div class="inner">-->
        <!--<router-link class='logo' to='/'>-->
          <!--<span>docsign</span>-->
        <!--</router-link>-->
      <!--</div>-->
    <!--</nav>-->
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
  }
}
</script>

<style src='./App.scss' lang='scss' />
