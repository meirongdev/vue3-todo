import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";

const routes = [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("../views/ToDoProject.vue"),
      props: true,
    },
  ],
  // createRouter will create the router instance that we can inject into our app as a plugin
  router = createRouter({
    // createWebHistory
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      return { top: 0 };
    },
  });
// https://router.vuejs.org/guide/advanced/navigation-guards.html

export default router;
