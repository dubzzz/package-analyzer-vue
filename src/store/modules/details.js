import { deps } from '../../api/Npm'

const state = { packages: {}, treatedPackages: {} };

const getters = {};

const actions = {
    async fetchPackage({ commit, state }, packageName) {
        if (state.treatedPackages[packageName]) return;
        commit('tagPackage', { packageName });
        commit('addPackage', { packageName, data: await deps(packageName) });
    }
};

const mutations = {
    addPackage(state, { packageName, data }) {
        state.packages = { ...state.packages, [packageName]: data };
    },
    tagPackage(state, { packageName }) {
        state.treatedPackages = { ...state.treatedPackages, [packageName]: true };
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}