<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{packageName}}</div>
        <div class="md-subhead">{{packageVersion}}</div>
      </md-card-header>

      <md-card-content>
        <div class="package-description">{{packageDescription}}</div>
        <div>
          <md-avatar class="md-avatar-icon">
            {{adjustedScores.maintenance}}
            <md-tooltip md-direction="top">Maintenance [0-5]</md-tooltip>
          </md-avatar>
          <md-avatar class="md-avatar-icon">
            {{adjustedScores.popularity}}
            <md-tooltip md-direction="top">Popularity [0-5]</md-tooltip>
          </md-avatar>
          <md-avatar class="md-avatar-icon">
            {{adjustedScores.quality}}
            <md-tooltip md-direction="top">Quality [0-5]</md-tooltip>
          </md-avatar>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Vue from "vue";
import { MdAvatar, MdCard, MdTooltip } from "vue-material/dist/components";

Vue.use(MdAvatar);
Vue.use(MdCard);
Vue.use(MdTooltip);

export default {
  name: "PackageQueryResult",
  props: {
    packageName: String,
    packageVersion: String,
    packageDescription: String,
    scores: Object
  },
  computed: {
    adjustedScores: function() {
      return {
        maintenance: Math.round(5 * this.scores.maintenance),
        popularity: Math.round(5 * this.scores.popularity),
        quality: Math.round(5 * this.scores.quality)
      };
    }
  }
};
</script>

<style scoped>
.package-description {
  font-size: 0.8em;
  padding-bottom: 1em;
}
</style>
