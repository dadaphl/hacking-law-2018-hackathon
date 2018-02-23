<template>
  <div class="document">
    <ae-panel>
      <div class="authors">
        <h2>Participants</h2>
        <div class='author grid' v-for='a in document.authors'>
          <div><ae-identity-avatar :address='a'/></div>
          <div>{{a}}</div>
        </div>
      </div>

      <div class="versios">
        <div v-for='v, k in document.versions' class="versio">
          <ae-divider/>
            <h2>Version {{k+1}}</h2>
            signedBy:
            <div class='author grid' v-for='s in v.signedBy'>
              <div><ae-identity-avatar :address='s'/></div>
              <div>{{s}}</div>
            </div>
        </div>
      </div>
      <div class="center">
        <ae-button type='exciting' :to='`/view/${document.id}`'>View Document</ae-button>
      </div>
    </ae-panel>
  </div>

</template>

<script>
import {
  AeButton,
  AeIdentityAvatar,
  AeDivider,
  AePanel
} from '@aeternity/aepp-components'
export default {
  props: [
    'document'
  ],
  components: {
    AeButton,
    AeDivider,
    AeIdentityAvatar,
    AePanel
  }
}
</script>
