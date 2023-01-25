import { countryOrderType } from "@/types/countries";
import { fieldsType } from "@/types/fields";

export default {
  state: () => ({
    countries: [],
    locations: {},
    hintsCount: -1,
    questionField: "flag",
    answerField: "name",
    fields: fieldsType,
    countryOrder: countryOrderType.Random,
    countryOrders: Object.values(countryOrderType),
    answersCount: 4,
    autoNextDelay: 0,
  }),

  getters: {
    countries(state) {
      return state.countries;
    },

    countriesActive(state) {
      return state.countries.filter(
        (e) =>
          e[state.questionField] !== null &&
          e[state.answerField] !== null &&
          Object.keys(state.locations)
            .filter((k) => state.locations[k].isEnabled === true)
            .includes(e.location)
      );
    },

    locations(state) {
      return state.locations;
    },

    hintsCount(state) {
      return state.hintsCount;
    },

    answerField(state) {
      return state.answerField;
    },

    questionField(state) {
      return state.questionField;
    },

    fields(state) {
      return state.fields;
    },

    countryOrder(state) {
      return state.countryOrder;
    },

    countryOrders(state) {
      return state.countryOrders;
    },

    answersCount(state) {
      return state.answersCount;
    },

    autoNextDelay(state) {
      return state.autoNextDelay;
    },
  },

  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },

    setLocation(state, locations) {
      state.locations = locations;
    },

    setLocationIsEnabled(state, { locationName = "", isEnabled = true }) {
      state.locations[locationName].isEnabled = isEnabled;
    },

    setHintsCount(state, count = 0) {
      state.hintsCount = count;
    },

    setAnswerField(state, field) {
      state.answerField = field;
    },

    setQuestionField(state, field) {
      state.questionField = field;
    },

    swapFields(state) {
      const answerField = state.answerField;
      const questionField = state.questionField;

      state.questionField = answerField;
      state.answerField = questionField;
    },

    setCountryOrder(state, orders) {
      state.countryOrder = orders;
    },

    setAnswersCount(state, count = 0) {
      state.answersCount = count;
    },

    setAutoNextDelay(state, delay = 0) {
      state.autoNextDelay = delay;
    },
  },

  namespaced: true,
};
