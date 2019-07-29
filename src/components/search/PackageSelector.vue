<template>
  <div id="package-query">
    <md-field>
      <label>Package name</label>
      <md-input v-model="query"></md-input>
    </md-field>
  </div>
</template>

<script>
import Vue from "vue";
import { MdField } from "vue-material/dist/components";

Vue.use(MdField);

export default {
  name: "PackageSelector",
  data: () => ({ query: "" })
};
</script>

<style scoped>
#package-query {
  display: inline-block;
  width: 30%;
}
</style>
