<template>
  <div id="details-page">
    <div id="back-search">
      <md-button class="md-icon-button md-raised" v-on:click="backHome">
        <md-icon>search</md-icon>
      </md-button>
    </div>
    <h2>
      Details for
      <em>{{packageName}}</em>
    </h2>
    <svg width="400" height="300" />
  </div>
</template>

<script>
import * as d3 from "d3";
import Vue from "vue";
import { MdButton, MdIcon } from "vue-material/dist/components";

import { deps } from "../api/Npm";

Vue.use(MdButton);
Vue.use(MdIcon);

export default {
  name: "DetailsPage",
  props: {
    packageName: String
  },
  data: () => ({ nodes: [], links: [], packages: {} }),
  methods: {
    backHome: function() {
      this.$router.push({ name: "search", params: {} });
    }
  },
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

          nodes.push({ id: currentPackage, group: 1 });
          for (const requirement in packageDeps) {
            remaining.push(requirement);
            links.push({
              source: currentPackage,
              target: requirement,
              value: 1
            });
          }

          if (this.packageName !== newPackageName) return;

          this.nodes = nodes;
          this.links = links;
        }
        const simulation = d3
          .forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(l => l.id))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(400 / 2, 300 / 2));
        const svg = d3.select("svg");
        const link = svg
          .append("g")
          .attr("stroke", "#777")
          .selectAll("line")
          .data(links)
          .join("line");
        const node = svg
          .append("g")
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("r", 3)
          .attr("fill", "blue");
        node.append("title").text(n => n.id);
        simulation.on("tick", () => {
          link
            .attr("x1", l => l.source.x)
            .attr("y1", l => l.source.y)
            .attr("x2", l => l.target.x)
            .attr("y2", l => l.target.y);
          node.attr("cx", n => n.x).attr("cy", n => n.y);
        });
      }
    }
  }
};
</script>

<style scoped>
#details-page {
  text-align: center;
}
#back-search {
  position: fixed;
  left: 5px;
  top: 5px;
}
</style>
