import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import IPFS from 'ipfs-mini'
import Bluebird from 'bluebird'
import bs58 from 'bs58'
import _ from 'lodash'
import IdManagerProvider from '@aeternity/id-manager-provider'
import contractMeta from '@/assets/contracts/Main.json'

const rpcUrl = 'http://localhost:8545' // 'https://kovan.infura.io'

Vue.use(Vuex)
const idManager = new IdManagerProvider({
  skipSecurity: process.env.NODE_ENV === 'development',
  rpcUrl
})
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

ipfs.addJSONAsync = Bluebird.promisify(ipfs.addJSON)
ipfs.catJSONAsync = Bluebird.promisify(ipfs.catJSON)

const getContent = ipfsHash =>
  ipfs.catJSONAsync(bs58.encode(Buffer.from(`1220${ipfsHash.slice(2)}`, 'hex')))

const saveContent = async (content) => {
  const ipfsHash = await ipfs.addJSONAsync(content)
  return `0x${Buffer.from(bs58.decode(ipfsHash).slice(2)).toString('hex')}`
}

const store = new Vuex.Store({
  state: {
    documents: {},
    web3Provider: null,
    networkId: null,
    account: null
  },

  getters: {
    web3 ({ web3Provider }) {
      if (!web3Provider) return null
      return new Web3(web3Provider)
    },
    contract ({ networkId, account }, { web3 }) {
      if (!networkId || !contractMeta.networks[networkId]) return null
      const { address } = contractMeta.networks[networkId]
      const contract = new web3.eth.Contract(contractMeta.abi, address)
      contract.options.from = account
      return contract
    }
  },

  mutations: {
    setWeb3Provider (state, web3Provider) {
      state.web3Provider = web3Provider
    },
    setNetworkId (state, networkId) {
      state.networkId = networkId
    },
    setAccount (state, account) {
      state.account = account
    }
  },

  actions: {
    async createDocument ({ getters: { contract }, commit, state: { account } }, { content, authors }) {
      await contract.methods.createDocument(await saveContent(content), authors).send()
    },
    async addVersion ({ getters: { contract }, commit }, { documentId, content }) {
      await contract.methods.addVersion(documentId, await saveContent(content)).send()
    },
    async signVersion ({ getters: { contract }, commit }, { documentId, versionId }) {
      await contract.methods.signVersion(documentId, versionId).send()
    }
  }
})

let accountPollInterval
store.watch(
  (state, { web3 }) => web3,
  async (web3) => {
    if (!web3) return
    clearInterval(accountPollInterval)
    accountPollInterval = setInterval(async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0] || null
      if (account !== store.state.account) {
        store.commit('setAccount', account)
      }
    }, 1000)
    store.commit('setNetworkId', await web3.eth.net.getId())
  },
  { immediate: true })

let documentsPollInterval
store.watch(
  (state, { contract }) => contract,
  async (contract) => {
    if (!contract) return
    clearInterval(documentsPollInterval)

    let syncDocumentsRunning = false
    const syncDocuments = async () => {
      if (syncDocumentsRunning) return
      syncDocumentsRunning = true
      const documentIds = await contract.methods.authorOfDocuments().call()
      const documents = {}
      await Promise.all(documentIds.map(async (documentId) => {
        const document = { id: documentId }
        document.authors = await contract.methods.documentAuthors(documentId).call()
        const versionCount = await contract.methods.documentVersionCount(documentId).call()
        document.versions = await Promise.all(_.times(versionCount, async versionId => {
          const t = await contract.methods.documentVersion(documentId, versionId).call()
          t.content = await getContent(t.content)
          return { content: t.content, signedBy: t.signedBy }
        }))
        documents[documentId] = document
      }))
      Vue.set(store.state, 'documents', documents)
      syncDocumentsRunning = false
    }

    documentsPollInterval = setInterval(syncDocuments, 2000)
  },
  { immediate: true })

window.addEventListener('load', async () => {
  if (await idManager.checkIdManager()) {
    store.commit('setWeb3Provider', idManager.web3.currentProvider)
  } else if (window.web3) {
    store.commit('setWeb3Provider', window.web3.currentProvider)
  } else {
    store.commit('setWeb3Provider', new Web3.providers.HttpProvider(rpcUrl))
  }
})

export default store
