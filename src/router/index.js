import { createRouter, createWebHashHistory } from "vue-router";

import Game from "@/pages/Game.vue";
import Main from "@/pages/Main.vue";
import Settings from "@/pages/Settings.vue";
import CountriesTable from "@/pages/CountriesTable.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/countries-table",
    name: "CountriesTable",
    component: CountriesTable,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
