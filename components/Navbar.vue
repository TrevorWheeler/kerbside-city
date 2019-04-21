<template>
  <nav class="navbar">
    <div class="brand title">Kerbside City</div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.navbar {
  display: flex;
  height: 80px;
  align-items: center;
  position: fixed;
  padding: 0 30px;
  top: 0;
  left: 0;
  width: 100%;
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 1px;
  }
}
</style>
