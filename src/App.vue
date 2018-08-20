<template>
  <div id="app">
    <navbar/>
    <dashboard/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'app',
  components: {  Navbar, Dashboard }
}
</script>
