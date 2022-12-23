export default {
  state: () => ({
    currentLang: "ru",

    localization: {},
  }),

  getters: {
    currentLang(state) {
      return state.currentLang;
    },

    accessLangs(state) {
      return Object.keys(state.localization);
    },

    localization(state) {
      return state.localization[state.currentLang];
    },
  },

  mutations: {
    setCurrentLang(state, lang = "") {
      state.currentLang = lang;
    },

    setLocalization(state, localization) {
      state.localization = localization;
    },
  },

  namespaced: true,
};
