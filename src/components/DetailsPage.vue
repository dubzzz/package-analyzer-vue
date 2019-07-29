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
    <p v-if="numRemaining > 0">
      Currently loading {{numRemaining}} package(s)...
      <br />
      Over {{numNodes+numRemaining}} detected
    </p>
    <p v-if="numRemaining === 0">{{numNodes}} packages</p>
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
  data: () => ({
    cleanD3: () => {},
    packages: {},
    numNodes: 0,
    numRemaining: 0
  }),
  methods: {
    backHome: function() {
      this.$router.push({ name: "search", params: {} });
    },
    drawGraph: function(nodes, links) {
      this.cleanD3();
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
      const title = node.append("title").text(n => n.id);
      simulation.on("tick", () => {
        link
          .attr("x1", l => l.source.x)
          .attr("y1", l => l.source.y)
          .attr("x2", l => l.target.x)
          .attr("y2", l => l.target.y);
        node.attr("cx", n => n.x).attr("cy", n => n.y);
      });
      this.cleanD3 = () => {
        link.remove();
        node.remove();
        title.remove();
      };
    }
  },
  watch: {
    packageName: {
      immediate: true,
      handler: async function(newPackageName) {
        const nodes = [];
        const links = [];
        const visited = { [newPackageName]: true };
        nodes.push({ id: newPackageName, group: 1 });
        const remaining = [newPackageName];
        this.packages[newPackageName] =
          this.packages[newPackageName] || deps(newPackageName);

        while (remaining.length !== 0) {
          this.numNodes = nodes.length;
          this.numRemaining = remaining.length;

          const [currentPackage] = remaining.splice(-1);
          const packageDeps =
            (await this.packages[currentPackage]).collected.metadata
              .dependencies || {};

          for (const requirement in packageDeps) {
            if (visited[requirement] !== true) {
              visited[requirement] = true;
              remaining.push(requirement);
              nodes.push({ id: requirement, group: 1 });
              this.packages[requirement] =
                this.packages[requirement] || deps(requirement);
            }

            links.push({
              source: currentPackage,
              target: requirement,
              value: 1
            });
          }

          if (this.packageName !== newPackageName) return;
        }

        this.numNodes = nodes.length;
        this.numRemaining = 0;
        this.drawGraph(nodes, links);
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
