<template>
  <div>
    <navbar></navbar>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {
    Navbar: () => import("@/components/Navbar")
  }
}
</script>
