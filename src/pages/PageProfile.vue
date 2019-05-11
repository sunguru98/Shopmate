<template>
  <div class="profile__container shadowed margin-top-25 margin-bottom-5">
    <Spinner v-show="loadingState"/>
    <ProfileCredentials v-show="!loadingState"/>
    <ProfileAddress v-show="!loadingState"/>
  </div>
</template>

<script>
import Spinner from '@/components/AppLoadingComponent.vue'
import ProfileCredentials from '@/components/ProfileCredentials.vue'
import ProfileAddress from '@/components/ProfileAddress.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    Spinner,
    ProfileCredentials,
    ProfileAddress
  },
  computed: {
    ...mapGetters({
      loadingState: 'getLoadingState'
    })
  },
  created () {
    this.$emit('pageReady')
  }
}
</script>

<style>

</style>
