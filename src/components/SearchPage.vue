<template>
  <div id="search-page">
    <PackageSelector />
  </div>
</template>

<script>
import PackageSelector from "./search/PackageSelector";

export default {
  name: "SearchPage",
  components: {
    PackageSelector
  }
};
</script>

<style scoped>
#search-page {
  text-align: center;
}
</style>
