<template>
  <div>
    <div id="package-query">
      <md-field>
        <label>Package name</label>
        <md-input v-model="query" v-on:input="updateQuery"></md-input>
      </md-field>
    </div>
    <div id="package-results">
      <div
        v-for="r in results"
        v-bind:key="r.package.name"
        v-on:click="selectPackage(r.package.name)"
      >
        <PackageQueryResult
          v-bind:package-name="r.package.name"
          v-bind:package-version="r.package.version"
          v-bind:package-description="r.package.description"
          v-bind:scores="r.score.detail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { MdField } from "vue-material/dist/components";

import PackageQueryResult from "./PackageQueryResult";

import { list } from "../../api/Npm";

Vue.use(MdField);

export default {
  name: "PackageSelector",
  components: { PackageQueryResult },
  data: () => ({ query: "", results: [] }),
  methods: {
    selectPackage: function(packageName) {
      this.$router.push({ name: "details", params: { packageName } });
    },
    updateQuery: async function() {
      const query = this.query;
      const results = await list(query, 9);
      if (query !== this.query) return; // request expired
      this.results = results;
    }
  }
};
</script>

<style scoped>
#package-query {
  display: inline-block;
  width: 30%;
}
</style>
