export default {
  data () {
    return {
      cartObj: {
        cart_id: null,
        product_id: null,
        attributes: {
          color: null,
          size: 'Size'
        }
      }
    }
  },
  computed: {
    inputReceived () {
      // eslint-disable-next-line quotes
      return this.cartObj.attributes.size !== 'Size' && this.cartObj.attributes.color !== null
    }
  },
  created () {
    this.cartObj.cart_id = this.cartId
  }
}
