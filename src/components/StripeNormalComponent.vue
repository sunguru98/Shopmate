<template>
  <div class="" style="padding: 0 8rem 10rem 8rem">
    <form style="position: relative" @submit.prevent="createToken" action="/charge" method="post" id="payment-form">
      <div class="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <div id="card-element">
          <!-- A Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display Element errors. -->
        <div id="card-errors" role="alert"></div>
      </div>
      <router-link style="margin: 2.5rem 0; position: absolute; right: 20%" class="product__cart-btn btnghost" :to="{name: 'Home'}">Cancel</router-link>
      <button style="margin: 2.5rem 0; position: absolute; right: 0" class="product__cart-btn second">Submit Payment</button>
    </form>
  </div>
</template>

<script>
const stripe = Stripe('pk_test_NcwpaplBCuTL6I0THD44heRe')
const elements = stripe.elements()
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#000",
    fontFamily: 'Montserrat, sans-serif'
  },
}

export default {
  data () {
    return {
      cardObj: null
    }
  },
  mounted () {
    // Create an instance of the card Element.
    const card = elements.create('card', { style, hidePostalCode: true })
    this.cardObj = card
    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element')
    card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors')
      if (error) {
        displayError.textContent = error.message
      } else {
        displayError.textContent = ''
      }
    })
  },
  methods: {
    createToken () {
      this.$store.dispatch('fetchStripeToken', {
        cardObj: this.cardObj,
        stripeInstance: stripe
      })
    }
  }
}
</script>

<style>
  /**
  * The CSS shown here will not be introduced in the Quickstart guide, but shows
  * how you can use CSS to style your Element's container.
  */
  #card-errors {
    color: #f62f5e;
    font-weight: 700;
  }
  #shape{
    margin-top: 3px;
  }
  .CardField-input-wrapper {
    margin-top: 4px !important;
  }
  .StripeElement {
    box-sizing: border-box;

    height: 5rem;
    padding: 10px;

    border: 1px solid #e1e1e1;
    border-radius: 6px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #f62f5e;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  .ElementsApp.is-invalid .Icon-fill {
    fill: #f62f5e;
  }
</style>
