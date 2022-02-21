<template>
  <div>

    <userCard></userCard>
  </div>
</template>

<script>
import userCard from '@/components/userCard'
export default {
  components: { userCard },
  created () {
    console.log(this.$route.params)
  }
}
</script>

<style>
</style>
