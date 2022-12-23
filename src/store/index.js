import { createStore } from "vuex";
import localizationModule from "@/store/module/localization";
import settingsModule from "@/store/module/settings";

export default createStore({
  modules: { localization: localizationModule, settings: settingsModule },
});
