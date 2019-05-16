<template>
  <div v-if="asyncDataStatus_ready" class="profile__container shadowed margin-top-25 margin-bottom-5">
    <Spinner v-show="loadingState"/>
    <ProfileCredentials v-show="!loadingState"/>
    <ProfileAddress v-show="!loadingState"/>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
import Spinner from '@/components/common/AppLoadingComponent.vue'
import ProfileCredentials from '@/components/profile/ProfileCredentials.vue'
import ProfileAddress from '@/components/profile/ProfileAddress.vue'
import {mapGetters} from 'vuex'
export default {
  mixins: [asyncDataStatus],
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
    this.asyncDataStatusFetch()
  }
}
</script>

<style>

</style>
