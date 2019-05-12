<template>
  <div class="checkout__progress">
    <div class="lines">
      <div class="line1" :class="{progressed: stepNumber === 2 || stepNumber === 3 || stepNumber === 4}"></div>
      <div class="line2" :class="{progressed: stepNumber === 3 || stepNumber === 4}"></div>
      <div class="line3" :class="{progressed: stepNumber === 4}"></div>
    </div>
    <div class="circles">
      <div class="circle" :class="{progressed: stepNumber === 1 || stepNumber === 2 || stepNumber === 3 || stepNumber === 4}"></div>
      <div class="circle" :class="{progressed: stepNumber === 2 || stepNumber === 3 || stepNumber === 4}"></div>
      <div class="circle" :class="{progressed: stepNumber === 3 || stepNumber === 4}"></div>
      <div class="circle" :class="{progressed: stepNumber === 4}"></div>
    </div>
    <div class="titles">
      <h3 class="title1" :class="{'primary-color': stepNumber === 1 || stepNumber === 2 || stepNumber === 3 || stepNumber === 4}">Delivery</h3>
      <h3 class="title2" :class="{'primary-color': stepNumber === 2 || stepNumber === 3 || stepNumber === 4}">Confirmation</h3>
      <h3 class="title3" :class="{'primary-color': stepNumber === 3 || stepNumber === 4}">Payment</h3>
      <h3 class="title4" :class="{'primary-color': stepNumber === 4}">Finish</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stepNumber']
}
</script>

<style>
</style>
