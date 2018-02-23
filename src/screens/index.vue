<template>
  <div>
    <pre>{{documents}}</pre>
    <br />

    <textarea v-model="content" />
    <button @click="createDocument">Create document</button>
    <br />

    <textarea v-model="content" />
    <input v-model="documentId" />
    <button @click="addVersion">Add version</button>
    <br />

    <input v-model="documentId" />
    <input v-model="versionId" />
    <button @click="signVersion">Sign version</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      content: '',
      documentId: '',
      versionId: ''
    }),
    computed: mapState(['documents']),
    methods: {
      createDocument () {
        this.$store.dispatch('createDocument', {
          content: this.content,
          authors: [
            '0xE29cC34a14FFAFF1718758194F856636593DD7fe',
            '0x62420C22b3aeACdCaC9D30dB6AF64B1BaEef0673'
          ]
        })
      },
      addVersion () {
        this.$store.dispatch('addVersion', {
          content: this.content,
          documentId: this.documentId
        })
      },
      signVersion () {
        this.$store.dispatch('signVersion', {
          documentId: this.documentId,
          versionId: this.versionId
        })
      }
    }
  }
</script>
