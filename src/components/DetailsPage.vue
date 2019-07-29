<template>
  <div>
    <div id="details-page">Details for {{packageName}}</div>
    <div>nodes: {{nodes}}</div>
    <div>links: {{links}}</div>
  </div>
</template>

<script>
import { deps } from "../api/Npm";

export default {
  name: "DetailsPage",
  props: {
    packageName: String
  },
  data: () => ({ nodes: [], links: [], packages: {} }),
  watch: {
    packageName: {
      immediate: true,
      handler: async function(newPackageName) {
        const nodes = [];
        const links = [];
        const visited = {};
        const remaining = [newPackageName];
        while (remaining.length !== 0) {
          const [currentPackage] = remaining.splice(-1);
          if (visited[currentPackage] === true) continue;
          visited[currentPackage] = true;

          const packageDeps =
            this.packages[currentPackage] ||
            ((await deps(currentPackage)).collected.metadata.dependencies ||
              {});
          this.packages[currentPackage] = packageDeps;

          nodes.push({ label: currentPackage });
          for (const requirement in packageDeps) {
            remaining.push(requirement);
            links.push({ target: currentPackage, source: requirement });
          }

          if (this.packageName !== newPackageName) return;

          this.nodes = nodes;
          this.links = links;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
