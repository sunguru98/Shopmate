export default {
  data () {
    return {
      asyncDataStatus_ready: false
    }
  },
  methods: {
    asyncDataStatusFetch () {
      this.asyncDataStatus_ready = true
      this.$emit('pageReady')
    }
  }
}
