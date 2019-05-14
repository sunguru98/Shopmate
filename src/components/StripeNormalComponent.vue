<template>
  <div class="" style="padding: 0 8rem 10rem 8rem">
    <form style="position: relative" @submit.prevent="createToken(cardObj)" action="/charge" method="post" id="payment-form">
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
const elements = stripe.elements({
  
})
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
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
    const card = elements.create('card', {style})
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
    async createToken (card) {
      const {token, error} = await stripe.createToken(card)
      console.log(token)
      if (error) {
        // Inform the customer that there was an error.
        const errorElement = document.getElementById('card-errors')
        errorElement.textContent = error.message
      } else {
        // Send the token to your server.
        this.stripeTokenHandler(token)
      }
    },
    stripeTokenHandler (token) {
      // Insert the token ID into the form so it gets submitted to the server
      const form = document.getElementById('payment-form')
      const hiddenInput = document.createElement('input')
      hiddenInput.setAttribute('type', 'hidden')
      hiddenInput.setAttribute('name', 'stripeToken')
      hiddenInput.setAttribute('value', token.id)
      form.appendChild(hiddenInput)
    }
  }
}
</script>

<style>
  /**
  * The CSS shown here will not be introduced in the Quickstart guide, but shows
  * how you can use CSS to style your Element's container.
  */
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
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
</style>
