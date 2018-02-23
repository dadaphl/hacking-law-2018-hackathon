<template>
  <div>
    <ae-panel>
      <h2>Your Documents</h2>
      <p class='center'>
       You dont have any Documents yet, create one
      </p>
      <div class="center">
        <ae-button type='exciting' to='/new'>
          Create new Document
        </ae-button>
      </div>
    </ae-panel>
  </div>

</template>
<script>
import {
  AeButton,
  AePanel
} from '@aeternity/aepp-components'
export default {
  components: {
    AeButton,
    AePanel
  }
}
</script>
