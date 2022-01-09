const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/home.vue") }],
  },
  {
    path: "/kleed",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/kleed.vue") }],
  },
  {
    path: "/max",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/max.vue") }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
