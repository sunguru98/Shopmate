<template>
    <div class="cell example example3" id="example-3">
      <form>
        <div class="fieldset">
          <input id="example3-name" data-tid="elements_examples.form.name_label" class="field" type="text" placeholder="Name" required="" autocomplete="name">
          <input id="example3-email" data-tid="elements_examples.form.email_label" class="field half-width" type="email" placeholder="Email" required="" autocomplete="email">
          <input id="example3-phone" data-tid="elements_examples.form.phone_label" class="field half-width" type="tel" placeholder="Phone" required="" autocomplete="tel">
        </div>
        <div class="fieldset">
          <div id="example3-card-number" class="field empty StripeElement"><div class="__PrivateStripeElement" style="margin: 0px !important; padding: 0px !important; border: none !important; display: block !important; background: transparent !important; position: relative !important; opacity: 1 !important;"><iframe frameborder="0" allowtransparency="true" scrolling="no" name="__privateStripeFrame15" allowpaymentrequest="true" src="https://js.stripe.com/v3/elements-inner-card-526df1d2f610b7ed4891cd03d8cb5720.html#style[base][color]=%23fff&amp;style[base][fontWeight]=600&amp;style[base][fontFamily]=Quicksand%2C+Open+Sans%2C+Segoe+UI%2C+sans-serif&amp;style[base][fontSize]=16px&amp;style[base][fontSmoothing]=antialiased&amp;style[base][:focus][color]=%23424770&amp;style[base][::placeholder][color]=%239BACC8&amp;style[base][:focus::placeholder][color]=%23CFD7DF&amp;style[invalid][color]=%23fff&amp;style[invalid][:focus][color]=%23FA755A&amp;style[invalid][::placeholder][color]=%23FFCCA5&amp;locale=en&amp;componentName=cardNumber&amp;wait=true&amp;rtl=false&amp;keyMode=test&amp;origin=https%3A%2F%2Fstripe.dev&amp;referrer=https%3A%2F%2Fstripe.dev%2Felements-examples%2F&amp;controllerId=__privateStripeController1" title="Secure payment input frame" style="border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important; height: 19.2px;"></iframe><input class="__PrivateStripeElement-input" aria-hidden="true" aria-label=" " autocomplete="false" maxlength="1" style="border: none !important; display: block !important; position: absolute !important; height: 1px !important; top: 0px !important; left: 0px !important; padding: 0px !important; margin: 0px !important; width: 100% !important; opacity: 0 !important; background: transparent !important; pointer-events: none !important; font-size: 16px !important;"></div></div>
          <div id="example3-card-expiry" class="field empty third-width StripeElement"><div class="__PrivateStripeElement" style="margin: 0px !important; padding: 0px !important; border: none !important; display: block !important; background: transparent !important; position: relative !important; opacity: 1 !important;"><iframe frameborder="0" allowtransparency="true" scrolling="no" name="__privateStripeFrame16" allowpaymentrequest="true" src="https://js.stripe.com/v3/elements-inner-card-526df1d2f610b7ed4891cd03d8cb5720.html#style[base][color]=%23fff&amp;style[base][fontWeight]=600&amp;style[base][fontFamily]=Quicksand%2C+Open+Sans%2C+Segoe+UI%2C+sans-serif&amp;style[base][fontSize]=16px&amp;style[base][fontSmoothing]=antialiased&amp;style[base][:focus][color]=%23424770&amp;style[base][::placeholder][color]=%239BACC8&amp;style[base][:focus::placeholder][color]=%23CFD7DF&amp;style[invalid][color]=%23fff&amp;style[invalid][:focus][color]=%23FA755A&amp;style[invalid][::placeholder][color]=%23FFCCA5&amp;locale=en&amp;componentName=cardExpiry&amp;wait=true&amp;rtl=false&amp;keyMode=test&amp;origin=https%3A%2F%2Fstripe.dev&amp;referrer=https%3A%2F%2Fstripe.dev%2Felements-examples%2F&amp;controllerId=__privateStripeController1" title="Secure payment input frame" style="border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important; height: 19.2px;"></iframe><input class="__PrivateStripeElement-input" aria-hidden="true" aria-label=" " autocomplete="false" maxlength="1" style="border: none !important; display: block !important; position: absolute !important; height: 1px !important; top: 0px !important; left: 0px !important; padding: 0px !important; margin: 0px !important; width: 100% !important; opacity: 0 !important; background: transparent !important; pointer-events: none !important; font-size: 16px !important;"></div></div>
          <div id="example3-card-cvc" class="field empty third-width StripeElement"><div class="__PrivateStripeElement" style="margin: 0px !important; padding: 0px !important; border: none !important; display: block !important; background: transparent !important; position: relative !important; opacity: 1 !important;"><iframe frameborder="0" allowtransparency="true" scrolling="no" name="__privateStripeFrame17" allowpaymentrequest="true" src="https://js.stripe.com/v3/elements-inner-card-526df1d2f610b7ed4891cd03d8cb5720.html#style[base][color]=%23fff&amp;style[base][fontWeight]=600&amp;style[base][fontFamily]=Quicksand%2C+Open+Sans%2C+Segoe+UI%2C+sans-serif&amp;style[base][fontSize]=16px&amp;style[base][fontSmoothing]=antialiased&amp;style[base][:focus][color]=%23424770&amp;style[base][::placeholder][color]=%239BACC8&amp;style[base][:focus::placeholder][color]=%23CFD7DF&amp;style[invalid][color]=%23fff&amp;style[invalid][:focus][color]=%23FA755A&amp;style[invalid][::placeholder][color]=%23FFCCA5&amp;locale=en&amp;componentName=cardCvc&amp;wait=true&amp;rtl=false&amp;keyMode=test&amp;origin=https%3A%2F%2Fstripe.dev&amp;referrer=https%3A%2F%2Fstripe.dev%2Felements-examples%2F&amp;controllerId=__privateStripeController1" title="Secure payment input frame" style="border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important; height: 19.2px;"></iframe><input class="__PrivateStripeElement-input" aria-hidden="true" aria-label=" " autocomplete="false" maxlength="1" style="border: none !important; display: block !important; position: absolute !important; height: 1px !important; top: 0px !important; left: 0px !important; padding: 0px !important; margin: 0px !important; width: 100% !important; opacity: 0 !important; background: transparent !important; pointer-events: none !important; font-size: 16px !important;"></div></div>
          <input id="example3-zip" data-tid="elements_examples.form.postal_code_placeholder" class="field empty third-width" placeholder="94107">
        </div>
        <button type="submit" data-tid="elements_examples.form.pay_button">Pay $25</button>
        <div class="error" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
            <path class="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
            <path class="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
          </svg>
          <span class="message"></span></div>
      </form>
      <div class="success">
        <div class="icon">
          <svg width="84px" height="84px" viewBox="0 0 84 84" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <circle class="border" cx="42" cy="42" r="40" stroke-linecap="round" stroke-width="4" stroke="#000" fill="none"></circle>
            <path class="checkmark" stroke-linecap="round" stroke-linejoin="round" d="M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338" stroke-width="4" stroke="#000" fill="none"></path>
          </svg>
        </div>
        <h3 class="title" data-tid="elements_examples.success.title">Payment successful</h3>
        <p class="message"><span data-tid="elements_examples.success.message">Thanks for trying Stripe Elements. No money was charged, but we generated a token:</span><span class="token">tok_189gMN2eZvKYlo2CwTBv9KKh</span></p>
        <a class="reset" href="#">
          <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <path fill="#000000" d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"></path>
          </svg>
        </a>
      </div>

      <div class="caption">
        <span data-tid="elements_examples.caption.no_charge" class="no-charge">Your card won't be charged</span>
        <a class="source" href="https://github.com/stripe/elements-examples/#example-3">
          <svg width="16px" height="10px" viewBox="0 0 16 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <path d="M1,8 L12,8 C12.5522847,8 13,8.44771525 13,9 C13,9.55228475 12.5522847,10 12,10 L1,10 C0.44771525,10 6.76353751e-17,9.55228475 0,9 C-6.76353751e-17,8.44771525 0.44771525,8 1,8 L1,8 Z M1,4 L8,4 C8.55228475,4 9,4.44771525 9,5 C9,5.55228475 8.55228475,6 8,6 L1,6 C0.44771525,6 6.76353751e-17,5.55228475 0,5 C-6.76353751e-17,4.44771525 0.44771525,4 1,4 L1,4 Z M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,1 C16,1.55228475 15.5522847,2 15,2 L1,2 C0.44771525,2 6.76353751e-17,1.55228475 0,1 L0,1 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 L1,0 Z" fill="#AAB7C4"></path>
          </svg>
          <span data-tid="elements_examples.caption.view_source">View source on GitHub</span>
        </a>
      </div>
    </div>
</template>

<script>
(function() {
  'use strict';

  var elements = stripe.elements({
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand',
      },
    ],
    // Stripe's examples are localized to specific languages, but if
    // you wish to have Elements automatically detect your user's locale,
    // use `locale: 'auto'` instead.
    locale: auto,
  });

  var elementStyles = {
    base: {
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#424770',
      },

      '::placeholder': {
        color: '#9BACC8',
      },

      ':focus::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      color: '#fff',
      ':focus': {
        color: '#FA755A',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  var elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
  };

  var cardNumber = elements.create('cardNumber', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardNumber.mount('#example3-card-number');

  var cardExpiry = elements.create('cardExpiry', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardExpiry.mount('#example3-card-expiry');

  var cardCvc = elements.create('cardCvc', {
    style: elementStyles,
    classes: elementClasses,
  });
  cardCvc.mount('#example3-card-cvc');

  registerElements([cardNumber, cardExpiry, cardCvc], 'example3');
})();

export default {
  mounted () {
    let stripeScript = document.createElement('script')
    stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
    document.head.appendChild(stripeScript)
  }
}
</script>

<style>
.example.example3 {
  background-color: #525f7f;
}

.example.example3 * {
  font-family: Quicksand, Open Sans, Segoe UI, sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.example.example3 .fieldset {
  margin: 0 15px 30px;
  padding: 0;
  border-style: none;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.example.example3 .field {
  padding: 10px 20px 11px;
  background-color: #7488aa;
  border-radius: 20px;
  width: 100%;
}

.example.example3 .field.half-width {
  width: calc(50% - (5px / 2));
}

.example.example3 .field.third-width {
  width: calc(33% - (5px / 3));
}

.example.example3 .field + .field {
  margin-top: 6px;
}

.example.example3 .field.focus,
.example.example3 .field:focus {
  color: #424770;
  background-color: #f6f9fc;
}

.example.example3 .field.invalid {
  background-color: #fa755a;
}

.example.example3 .field.invalid.focus {
  background-color: #f6f9fc;
}

.example.example3 .field.focus::-webkit-input-placeholder,
.example.example3 .field:focus::-webkit-input-placeholder {
  color: #cfd7df;
}

.example.example3 .field.focus::-moz-placeholder,
.example.example3 .field:focus::-moz-placeholder {
  color: #cfd7df;
}

.example.example3 .field.focus:-ms-input-placeholder,
.example.example3 .field:focus:-ms-input-placeholder {
  color: #cfd7df;
}

.example.example3 input, .example.example3 button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border-style: none;
}

.example.example3 input {
  color: #fff;
}

.example.example3 input::-webkit-input-placeholder {
  color: #9bacc8;
}

.example.example3 input::-moz-placeholder {
  color: #9bacc8;
}

.example.example3 input:-ms-input-placeholder {
  color: #9bacc8;
}

.example.example3 button {
  display: block;
  width: calc(100% - 30px);
  height: 40px;
  margin: 0 15px;
  background-color: #fcd669;
  border-radius: 20px;
  color: #525f7f;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.example.example3 button:active {
  background-color: #f5be58;
}

.example.example3 .error svg .base {
  fill: #fa755a;
}

.example.example3 .error svg .glyph {
  fill: #fff;
}

.example.example3 .error .message {
  color: #fff;
}

.example.example3 .success .icon .border {
  stroke: #fcd669;
}

.example.example3 .success .icon .checkmark {
  stroke: #fff;
}

.example.example3 .success .title {
  color: #fff;
}

.example.example3 .success .message {
  color: #9cabc8;
}

.example.example3 .success .reset path {
  fill: #fff;
}
</style>
