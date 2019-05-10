export default {
  data () {
    return {
      cartObj: {
        cart_id: null,
        product_id: null,
        attributes: {
          color: null,
          size: null
        }
      }
    }
  },
  computed: {
    inputReceived () {
      return this.cartObj.attributes.size !== null && this.cartObj.attributes.color !== null
    }
  },
  created () {
    this.cartObj.cart_id = this.cartId
  }
}
